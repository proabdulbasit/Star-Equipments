'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Product } from '@/utils/type';
import ProductCard from '@/components/ProductCard';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';
import { searchProducts } from '@/utils/shopify';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface SearchProduct extends Product {
  variants: {
    edges: Array<{
      node: {
        id: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
  featuredImage?: {
    url: string;
    altText?: string;
  };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchProducts(query);
        console.log('Search results:', searchResults);
        setResults(
          searchResults.products.map((edge) => edge.node) as SearchProduct[],
        );
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007934]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <button
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-[#007934] font-medium"
        onClick={() => router.back()}
        aria-label="Back"
      >
        <FiArrowLeft className="text-xl" />
        Back
      </button>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results for `{query}`
        </h1>
        <p className="text-gray-600">
          Found {results.length} {results.length === 1 ? 'result' : 'results'}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No results found
          </h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search terms or browse our categories
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((product) => {
            const variant = product.variants.edges[0]?.node;
            console.log('Product:', product.title, 'Variant:', variant);

            if (!variant) {
              console.log('No variant found for product:', product.title);
              return null;
            }

            const price = variant.price?.amount
              ? `$${parseFloat(variant.price.amount).toFixed(2)}`
              : 'N/A';
            const compareAtPrice = variant.compareAtPrice?.amount
              ? `$${parseFloat(variant.compareAtPrice.amount).toFixed(2)}`
              : undefined;

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.featuredImage?.url || '/placeholder-image.jpg'}
                price={price}
                altText={product.featuredImage?.altText || product.title}
                compareAtPrice={compareAtPrice}
                onAddToCart={() => {
                  console.log(
                    'Add to cart button clicked for product:',
                    product.title,
                  );
                  console.log('Variant ID:', variant.id);
                  handleAddToCart(variant.id);
                }}
                isLoading={isAdding[variant.id]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
