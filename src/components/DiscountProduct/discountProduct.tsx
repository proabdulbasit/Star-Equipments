'use client';

import { useEffect, useState } from 'react';
import { getDiscountedProducts, getProducts } from '@/utils/shopify';
import { DiscountedProduct, Product } from '@/utils/type';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import { toast } from 'sonner';

export default function DiscountProduct() {
  const [products, setProducts] = useState<DiscountedProduct[]>([]);
  const [fallbackProducts, setFallbackProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchDiscountedProducts() {
      try {
        const data = await getDiscountedProducts();
        if (data.length > 0) {
          setProducts(data.slice(0, 4));
        } else {
          // Fallback: fetch any 4 products
          const fallback = await getProducts();
          setFallbackProducts(
            fallback.products.edges.slice(0, 4).map((edge) => edge.node),
          );
        }
      } catch (err) {
        setError('Failed to load discounted products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDiscountedProducts();
  }, []);

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 max-w-[1440px] mx-auto">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden animate-pulse h-full"
          >
            <div className="relative w-full aspect-[4/3] bg-gray-200" />
            <div className="flex-1 flex flex-col justify-between p-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="flex items-end justify-between mt-auto">
                <div className="h-6 w-1/2 bg-gray-200 rounded mb-4" />
                <div className="ml-2 h-10 w-10 bg-gray-200 rounded-full mt-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Show fallback products if no discounted products
  const showFallback = products.length === 0 && fallbackProducts.length > 0;

  return (
    <div className="bg-[#E8EAED] pb-10">
      <div className="flex items-center max-w-[1440px] mx-auto px-4 lg:px-12">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
          className="lg:w-[120px] lg:h-[120px] w-[50px] h-[50px]"
        />
        <div className="flex lg:w-[1440px] w-[95%] mx-auto items-center justify-between">
          <h1 className="lg:text-3xl text-lg michroma-regular text-center text-[#2C2C2C]">
            Discount Products
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 max-w-[1440px] mx-auto lg:px-10">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              altText={product.title}
              discount={'Discount'}
              compareAtPrice={product.compareAtPrice}
              onAddToCart={() => handleAddToCart(product.variantId)}
              isLoading={isAdding[product.variantId]}
            />
          ))}
        {showFallback &&
          fallbackProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.featuredImage?.url || '/placeholder-image.jpg'}
              price={`$${product.priceRange.minVariantPrice.amount}`}
              altText={product.featuredImage?.altText || product.title}
              discount={'Discount'}
              onAddToCart={() =>
                handleAddToCart(product.variants.edges[0]?.node.id)
              }
              isLoading={isAdding[product.variants.edges[0]?.node.id]}
            />
          ))}
        {!loading && products.length === 0 && fallbackProducts.length === 0 && (
          <div className="col-span-4 text-center text-gray-500">
            No products available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
