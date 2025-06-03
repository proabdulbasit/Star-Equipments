'use client';

import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import Towing from '@/components/Towing';
import DiscountProduct from '@/components/DiscountProduct';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Parts from '@/components/Parts/Parts';
import { useEffect, useState, Suspense } from 'react';
import { searchProducts } from '@/utils/shopify';
import ProductCard from '@/components/ProductCard/ProductCard';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const categories = [
  {
    icon: '/assets/Homepage/nrc-icon.svg',
    label: 'NRC Parts',
    link: '/collections/nrc-parts',
  },
  {
    icon: '/assets/Homepage/ba-icon.svg',
    label: 'B/A Products',
    link: '/collections/baproducts',
  },
  {
    icon: '/assets/Homepage/cloth-icon.svg',
    label: 'Clothing',
    link: '/collections/clothing',
  },
  {
    icon: '/assets/Homepage/micro-icon.svg',
    label: 'Towmate',
    link: '/collections/towmate',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const query = searchParams.get('q');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (query) {
      setIsLoading(true);
      searchProducts(query, {
        priceFrom: from ? parseFloat(from) : undefined,
        priceTo: to ? parseFloat(to) : undefined,
      })
        .then((results) => {
          setSearchResults(results);
          // Update min/max prices based on results
          if (results.products.length > 0) {
            const prices = results.products.map((p: any) =>
              parseFloat(p.node.variants.edges[0]?.node.price.amount || 0),
            );
            setMinPrice(Math.min(...prices));
            setMaxPrice(Math.max(...prices));
          }
        })
        .catch((error) => {
          console.error('Search error:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setSearchResults(null);
    }
  }, [searchParams]);

  const handlePriceFilter = () => {
    const query = searchParams.get('q');
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (priceFrom) params.set('from', priceFrom);
    if (priceTo) params.set('to', priceTo);
    router.push(`/?${params.toString()}`);
    setPriceOpen(false);
  };

  const handleResetPrice = () => {
    setPriceFrom('');
    setPriceTo('');
    const query = searchParams.get('q');
    if (query) {
      router.push(`/?q=${query}`);
    }
    setPriceOpen(false);
  };

  const handleAddToCart = async (variantId: string) => {
    console.log('handleAddToCart called with variantId:', variantId);
    if (!variantId) {
      console.log('No variant ID available');
      toast.error('Product variant not available');
      return;
    }

    setIsAdding((prev) => ({ ...prev, [variantId]: true }));
    try {
      console.log('Attempting to add to cart...');
      await addToCart(variantId, 1);
      console.log('Successfully added to cart');
      toast.success('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsAdding((prev) => ({ ...prev, [variantId]: false }));
    }
  };

  const formatProductForCard = (product: any) => {
    const variant = product.variants.edges[0]?.node;
    const price = variant?.price?.amount
      ? `$${parseFloat(variant.price.amount).toFixed(2)}`
      : 'N/A';
    const compareAtPrice = variant?.compareAtPrice?.amount
      ? `$${parseFloat(variant.compareAtPrice.amount).toFixed(2)}`
      : undefined;

    return {
      id: product.id,
      title: product.title,
      image: product.featuredImage?.url || '/placeholder-image.jpg',
      price: price,
      altText: product.featuredImage?.altText || product.title,
      compareAtPrice: compareAtPrice,
      onAddToCart: () => {
        console.log('Add to cart button clicked for product:', product.title);
        console.log('Variant ID:', variant?.id);
        if (variant?.id) {
          handleAddToCart(variant.id);
        }
      },
      isLoading: isAdding[variant?.id],
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007934]"></div>
      </div>
    );
  }

  return (
    <div>
      {searchResults ? (
        <div className="max-w-[1440px] mx-auto px-4 py-8 lg:px-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiSearch className="text-[#007934] text-xl" />
              <h1 className="text-2xl font-semibold">
                Search Results for `{searchParams.get('q')}`
              </h1>
            </div>
            {/* <div className="relative">
              <button
                className="border border-gray-300 bg-white rounded px-3 py-1.5 text-base flex items-center gap-2 min-w-[100px] hover:bg-gray-50 transition-colors"
                onClick={() => setPriceOpen((v) => !v)}
                type="button"
              >
                <FiFilter className="text-[#007934]" />
                Price
                {(priceFrom || priceTo) && (
                  <span className="bg-[#007934] text-white text-xs px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </button>
              {priceOpen && (
                <div className="absolute z-20 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Price Range</h3>
                    <button
                      onClick={() => setPriceOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Range: ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}
                    </span>
                    {(priceFrom || priceTo) && (
                      <button
                        className="text-xs text-[#007934] hover:text-[#005f27] underline"
                        onClick={handleResetPrice}
                        type="button"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="flex gap-3 mt-2">
                    <div className="flex flex-col flex-1">
                      <label className="text-xs font-medium text-gray-700 mb-1">
                        From
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          min={minPrice}
                          max={maxPrice}
                          value={priceFrom}
                          onChange={(e) => setPriceFrom(e.target.value)}
                          className="border border-gray-300 rounded-lg px-2 pl-7 py-2 w-full focus:ring-2 focus:ring-[#007934] focus:border-transparent"
                          placeholder={minPrice.toFixed(2)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <label className="text-xs font-medium text-gray-700 mb-1">
                        To
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          min={minPrice}
                          max={maxPrice}
                          value={priceTo}
                          onChange={(e) => setPriceTo(e.target.value)}
                          className="border border-gray-300 rounded-lg px-2 pl-7 py-2 w-full focus:ring-2 focus:ring-[#007934] focus:border-transparent"
                          placeholder={maxPrice.toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="mt-4 w-full bg-[#007934] text-white py-2 rounded-lg hover:bg-[#005f27] transition-colors font-medium"
                    onClick={handlePriceFilter}
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div> */}
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg p-4 animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : searchResults.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.products.map((product: any) => (
                <ProductCard
                  key={product.node.id}
                  {...formatProductForCard(product.node)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl text-gray-600">No products found</h2>
              <p className="text-gray-500 mt-2">
                Try different search terms or browse our categories
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <HeroSection
            image="/images/caraosuel3.jpg"
            title="Elevate your towing game!"
            para="Premium Equipment from Star Equipment Sales"
          />
          <div className="shade py-5 w-full ">
            <motion.h1
              className="text-3xl  michroma-regular text-center  text-white  mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              Product Categories
            </motion.h1>
            <motion.div
              className="mt-10 mx-auto grid grid-cols-2 gap-8 max-w-[1440px] px-5 lg:px-12 mb-10
                 md:flex md:items-center md:justify-between"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.label + idx}
                  className="flex flex-col items-center group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => {
                    router.push(cat.link);
                  }}
                >
                  <Image
                    src={cat.icon}
                    alt="icon"
                    width={82}
                    height={82}
                    className="transition-transform duration-300"
                  />
                  <h1 className="text-lg text-white roboto-condensed mt-2">
                    {cat.label}
                  </h1>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Parts />
          <DiscountProduct />
          <Towing />

          {/* YouTube Video Section */}
          <section
            className="w-full py-16 relative bg-cover bg-center"
            style={{ backgroundImage: "url('/images/caraosuel2.jpg')" }}
          >
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#14532d]/80 to-[#048B3D]/40 z-0 pointer-events-none" />
            <motion.h2
              className="text-3xl michroma-regular text-center text-white mb-10 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              Watch Us in Action
            </motion.h2>
            <motion.div
              className="max-w-[900px] mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src="https://www.youtube.com/embed/CC9GEiL7Ujc?rel=0&modestbranding=1&controls=1&loop=1&playlist=CC9GEiL7Ujc"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </section>
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
