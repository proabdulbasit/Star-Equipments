'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { retrieveCart } from '@/utils/shopify';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

interface NRCCategoryCardProps {
  category: {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: {
      url: string;
      altText: string;
    };
  };
}

const NRCCategoryCard: React.FC<NRCCategoryCardProps> = ({ category }) => {
  const { cart, addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    const cartId = Cookies.get('cartId');

    if (cartId) {
      try {
        const currentCart = await retrieveCart(cartId);
        const existingItem = currentCart.lines.edges.find(
          (edge: any) => edge.node.merchandise.product.id === category.id,
        );

        if (existingItem) {
          toast.error('Item already in cart', {
            description:
              'This item is already in your cart. You can update the quantity in the cart.',
          });
          return;
        }
      } catch (error) {
        console.error('Error checking cart:', error);
      }
    }

    // If not in cart, proceed with navigation
    window.location.href = `/collections/${category.handle}`;
  };

  const handleAddToCartVariant = async (variantId: string) => {
    try {
      await addToCart(variantId, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <Link
      href={`/collections/${category.handle}`}
      className="group block h-full"
      onClick={handleAddToCart}
    >
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
        {/* Category Image Container */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
          {/* Image */}
          <Image
            src={category.image.url}
            alt={category.image.altText || category.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Category Info */}
        <div className="p-6 flex flex-col flex-grow bg-white relative">
          {/* Title */}
          <h2 className="text-xl font-semibold text-[#2C2C2C] mb-2 line-clamp-2 group-hover:text-[#007934] group-hover:underline transition-colors duration-300">
            {category.title}
          </h2>

          {/* Description */}
          {category.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
              {category.description}
            </p>
          )}

          {/* View Category Link */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <span className="text-[#007934] font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
              View Category
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NRCCategoryCard;
