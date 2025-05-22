'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  addToCart,
  updateCart,
  retrieveCart,
  getProductRecommendations,
} from '@/utils/shopify';
import { useCart } from '@/context/CartContext';
import { ProductDetailProps } from './type';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';

function ProductDetail({ product }: ProductDetailProps) {
  const [count, setCount] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const { cart, setCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const images = product.images?.edges?.map((edge) => edge.node.url) || [
    product.featuredImage?.url || '/assets/ProductDetail/placeholder.png',
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  useEffect(() => {
    async function fetchRecommendations() {
      if (product?.id) {
        setLoadingRecs(true);
        try {
          const recs = await getProductRecommendations(product.id);
          setRecommended(recs || []);
        } catch (e) {
          setRecommended([]);
        }
        setLoadingRecs(false);
      }
    }
    fetchRecommendations();
  }, [product?.id]);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  const handleAddToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    let cartId: any = sessionStorage.getItem('cartId');
    const variantId = product.variants.edges[0]?.node.id;

    if (count > 0 && variantId) {
      try {
        if (cartId) {
          await updateCart(cartId, variantId, count);
        } else {
          const data: any = await addToCart(variantId, count);
          cartId = data.cartCreate.cart.id;
          sessionStorage.setItem('cartId', cartId);
        }
        const updatedCart = await retrieveCart(cartId);
        setCart(updatedCart);
        toast.success('Item added to cart!', {
          description: `${product.title} has been added to your cart.`,
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add item to cart', {
          description: 'Please try again later.',
        });
      } finally {
        setIsAdding(false);
      }
    } else {
      toast.error('Please select a quantity.', {
        description: 'You must add at least one item.',
      });
      setIsAdding(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Product URL copied!', {
        description: window.location.href,
      });
    } catch (e) {
      toast.error('Failed to copy URL');
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row mb-10 mt-24 w-[90%] lg:w-[1400px] mx-auto bg-white rounded-lg p-2 gap-10">
        {/* Left: Product Image */}
        <div className="flex flex-col items-center">
          <div
            className="flex-1 flex items-center justify-center bg-white p-6 rounded-lg border border-gray-100 min-h-[450px] max-w-[470px] cursor-pointer"
            onClick={() => setIsCarouselOpen(true)}
          >
            <Image
              src={selectedImage}
              alt={product.featuredImage?.altText || product.title}
              width={500}
              height={500}
              className="object-contain rounded-md"
            />
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setSelectedIndex(idx)}
                  className={`border rounded-md p-1 ${selectedIndex === idx ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <Image
                    src={img}
                    alt={product.title}
                    width={60}
                    height={60}
                    className="object-contain rounded"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col gap-6 justify-start">
          <h1 className="text-[#2C2C2C] capitalize michroma-regular text-3xl font-semibold mb-2">
            {product.title}
          </h1>
          <p className="text-[#2C2C2C] font-bold text-2xl mb-1">
            ${product.priceRange.minVariantPrice.amount} USD
          </p>
          <p className="text-base text-gray-500 mb-2">
            <span className="underline cursor-pointer">Shipping</span>{' '}
            calculated at checkout.
          </p>
          {/* Product Description */}
          {product.description && (
            <p className="text-base text-gray-700 mb-2 whitespace-pre-line">
              {product.description}
            </p>
          )}
          {/* Product Details (if available) */}
          {product.details && Array.isArray(product.details) && (
            <div className="mb-2">
              <h3 className="font-semibold">Details:</h3>
              <ul className="list-disc ml-5">
                {product.details.map((detail: string, idx: number) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Quantity Selector */}
          <div>
            <p className="text-base font-semibold text-gray-700 mb-2">
              Quantity
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCount(Math.max(count - 1, 0))}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-2xl text-[#2C2C2C] hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                –
              </button>
              <span className="w-12 h-10 flex items-center justify-center border border-gray-200 rounded text-lg bg-gray-50">
                {count}
              </span>
              <button
                onClick={() => setCount(count + 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-2xl text-[#2C2C2C] hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <button
              onClick={handleAddToCart}
              className="cursor-pointer text-white text-center rounded-full text-lg font-bold bg-[#007934] w-[220px] h-[55px] shadow hover:bg-[#005f27] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isAdding}
            >
              {isAdding ? 'Adding...' : 'Add to cart'}
            </button>
            {/* <button className="cursor-pointer text-white text-center rounded-full text-lg font-bold bg-[#5433EB] w-[220px] h-[55px] flex items-center justify-center gap-2 shadow hover:bg-[#3a1fa3] transition-all">
              <Image
                src="/assets/ProductDetail/shop.svg"
                alt="shop"
                width={28}
                height={28}
                className="bg-white"
              />
              <span className="whitespace-nowrap">Buy with shop Pay</span>
            </button> */}
          </div>
          <Link
            href="#"
            className="text-base underline text-gray-700 mt-1 mb-2 w-fit"
          >
            More payment options
          </Link>
          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 mt-2 focus:outline-none"
          >
            <Image
              src="/assets/ProductDetail/share.svg"
              alt="share"
              width={20}
              height={20}
            />
            <span className="text-base text-gray-700">Share</span>
          </button>
        </div>
      </div>
      {/* You may also like */}
      <div className="flex bg-[#F4F4F4] items-center mt-10">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
        />
        <div className="flex w-full pr-24 items-center justify-center">
          <h1 className="text-3xl michroma-regular text-center text-[#2C2C2C]">
            You may also like
          </h1>
        </div>
      </div>
      <div className="xl:w-[1440px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
          {loadingRecs &&
            [...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="group w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden relative animate-pulse"
              >
                <div className="relative w-full aspect-[4/3] bg-gray-200 flex items-center justify-center overflow-hidden" />
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="flex items-end justify-between mt-auto">
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
                    <div className="ml-2 h-10 w-10 bg-gray-200 rounded-full mt-auto" />
                  </div>
                </div>
              </div>
            ))}
          {!loadingRecs && recommended.length === 0 && (
            <div className="col-span-4 text-center text-gray-500">
              No recommendations found.
            </div>
          )}
          {!loadingRecs &&
            recommended
              .slice(0, 4)
              .map((rec) => (
                <ProductCard
                  key={rec.id}
                  id={rec.id}
                  title={rec.title}
                  image={
                    rec.featuredImage?.url ||
                    '/assets/ProductDetail/placeholder.png'
                  }
                  price={rec.priceRange?.minVariantPrice?.amount || ''}
                  altText={rec.featuredImage?.altText || rec.title}
                />
              ))}
        </div>
      </div>
      {/* Carousel Modal */}
      {isCarouselOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative bg-white rounded-lg p-4 max-w-2xl w-full flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-2xl"
              onClick={() => setIsCarouselOpen(false)}
            >
              &times;
            </button>
            <div className="flex items-center">
              <button
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + images.length) % images.length,
                  )
                }
                className="text-3xl px-4"
              >
                &#8592;
              </button>
              <Image
                src={selectedImage}
                alt={product.featuredImage?.altText || product.title}
                width={600}
                height={600}
                className="object-contain rounded"
              />
              <button
                onClick={() =>
                  setSelectedIndex((selectedIndex + 1) % images.length)
                }
                className="text-3xl px-4"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
