'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  updateCart,
  retrieveCart,
  getProductRecommendations,
  getCheckoutUrl,
} from '@/utils/shopify';
import { useCart } from '@/context/CartContext';
import { ProductDetailProps } from './type';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';
import { SiShopify } from 'react-icons/si';
import { FaGooglePay } from 'react-icons/fa6';

function ProductDetail({ product }: ProductDetailProps) {
  const [count, setCount] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const { cart, setCart, addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const images = product.images?.edges?.map((edge) => edge.node.url) || [
    product.featuredImage?.url || '/assets/ProductDetail/placeholder.png',
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  // Extract all unique options and their values from variants if product.options is missing
  let options: { name: string; values: string[] }[] = [];
  if (product.options && product.options.length > 0) {
    options = product.options;
  } else {
    const optionMap: Record<string, Set<string>> = {};
    product.variants.edges.forEach(({ node }) => {
      node.selectedOptions?.forEach((opt) => {
        if (!optionMap[opt.name]) optionMap[opt.name] = new Set();
        optionMap[opt.name].add(opt.value);
      });
    });
    options = Object.entries(optionMap).map(([name, values]) => ({
      name,
      values: Array.from(values),
    }));
  }

  // State for selected options
  const initialOptions = options.reduce(
    (acc, option) => {
      acc[option.name] = option.values[0];
      return acc;
    },
    {} as Record<string, string>,
  );
  const [selectedOptions, setSelectedOptions] =
    useState<Record<string, string>>(initialOptions);

  // Find the variant that matches the selected options
  const getSelectedVariantId = () => {
    const variant = product.variants.edges.find(({ node }) =>
      node.selectedOptions?.every(
        (opt) => selectedOptions[opt.name] === opt.value,
      ),
    );
    return variant?.node.id;
  };
  const selectedVariantId = getSelectedVariantId();

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
    if (!selectedVariantId) {
      toast.error('Please select a variant');
      return;
    }

    if (count <= 0) {
      toast.error('Please select a quantity');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(selectedVariantId, count);
      setCount(0); // Reset quantity after successful add
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    const variantId = selectedVariantId;

    if (count > 0 && variantId) {
      try {
        // Create a new cart with the item
        const data: any = await addToCart(variantId, count);
        const cartId = data.cartCreate.cart.id;

        // Get the checkout URL
        const checkoutData = await getCheckoutUrl(cartId);
        const checkoutUrl = checkoutData.cart.checkoutUrl;

        // Redirect to checkout
        window.location.href = checkoutUrl;
      } catch (error) {
        console.error('Error during checkout:', error);
        toast.error('Failed to proceed to checkout', {
          description: 'Please try again later.',
        });
        setIsCheckingOut(false);
      }
    } else {
      toast.error('Please select a quantity.', {
        description: 'You must add at least one item.',
      });
      setIsCheckingOut(false);
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
            className="flex-1 flex items-center justify-center bg-white p-6 rounded-lg border border-gray-100 min-h-[600px] max-w-[600px] cursor-pointer"
            onClick={() => setIsCarouselOpen(true)}
          >
            <Image
              src={selectedImage}
              alt={product.featuredImage?.altText || product.title}
              width={600}
              height={600}
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
            <button
              type="button"
              onClick={() => (window.location.href = '/shipping-policy')}
              className="underline-offset-2 cursor-pointer hover:underline focus:underline text-inherit bg-transparent border-none p-0 m-0 font-inherit"
              style={{ textDecoration: 'underline' }}
            >
              Shipping
            </button>{' '}
            calculated at checkout.
          </p>
          {/* Option selectors (Size, Color, etc.) */}
          {options.length > 0 && (
            <div className="flex flex-col gap-4 mb-2">
              {options.map((option) => (
                <div key={option.name}>
                  {option.values.length > 1 && (
                    <div className="text-base font-semibold text-gray-700 mb-2">
                      {option.name}
                    </div>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [option.name]: value,
                          }))
                        }
                        className={`px-5 py-2 rounded-full border text-base font-semibold transition-colors
                          ${
                            selectedOptions[option.name] === value
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black border-gray-400 hover:bg-gray-100'
                          }`}
                        style={{ minWidth: 60 }}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
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
            <button
              onClick={handleBuyNow}
              className="cursor-pointer text-white text-center rounded-full text-lg font-bold bg-[#357a43] w-[220px] h-[55px] shadow hover:bg-[#005f27] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isCheckingOut}
            >
              {'Buy Now'}
            </button>
          </div>
          {/* Express checkout note */}
          <div className="flex flex-col items-start mt-3 mb-2">
            <span className="text-gray-500 text-sm mb-1">Express checkout</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex items-center px-4 py-2 rounded-lg bg-[#5A31F4] text-white text-lg font-semibold transition-colors hover:bg-[#4A2FD4] focus:outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isCheckingOut}
                aria-label="Checkout with Shop Pay"
              >
                <SiShopify className="mr-2 text-2xl" /> Shop Pay
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex items-center px-4 py-2 rounded-lg bg-black text-white text-lg font-semibold transition-colors hover:bg-gray-800 focus:outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isCheckingOut}
                aria-label="Checkout with Google Pay"
              >
                <FaGooglePay className="mr-2 text-2xl" /> G Pay
              </button>
            </div>
            {/* <span className="text-xs text-gray-500 mt-2 text-left">Shop Pay and G Pay will be available on the next page.</span> */}
          </div>
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
                  price={`$${rec.priceRange?.minVariantPrice?.amount}` || ''}
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
