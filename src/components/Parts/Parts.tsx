'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCollections } from '@/utils/shopify';

const SPECIFIC_COLLECTIONS = [
  {
    handle: 'nrc-parts',
    title: 'NRC Parts',
    description: "Enhance Your Fleet with NRC's Industry-Leading Parts",
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0620/6881/8159/collections/nrc-parts-986724.jpg?v=1732216033',
      altText: 'NRC Parts - starequipmentsales',
    },
  },
  {
    handle: 'baproducts',
    title: 'B/A Products',
    description: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0620/6881/8159/collections/ba-products-555031.jpg?v=1679434143',
      altText: 'BA Products - starequipmentsales',
    },
  },
  {
    handle: 'towmate',
    title: 'Towmate',
    description: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0620/6881/8159/collections/towmate-328831.jpg?v=1732216091',
      altText: 'Towmate - starequipmentsales',
    },
  },
  {
    handle: 'clothing',
    title: 'PORTWEST',
    description: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0620/6881/8159/collections/clothing-504340.jpg?v=1732216068',
      altText: 'CLOTHING - starequipmentsales',
    },
  },
];

function Parts() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const allCollections = await getAllCollections();
        const filtered = SPECIFIC_COLLECTIONS.map((spec) => {
          const match = allCollections?.find((c) => c.handle === spec.handle);
          return {
            ...spec,
            id: match?.id || spec.handle,
            productsCount: match?.productsCount || 0,
          };
        });
        setCollections(filtered);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-[#F4F4F4]">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-3xl michroma-regular text-center text-[#007934] mb-12 animate-pulse">
            Shop by Category
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col animate-pulse h-full"
              >
                <div className="relative w-full aspect-[4/3] bg-gray-200" />
                <div className="p-6 flex flex-col flex-grow bg-white relative">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="h-6 w-24 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#F4F4F4]">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-3xl michroma-regular text-center text-[#007934] mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group block h-full"
            >
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
                {/* Collection Image Container */}
                <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
                {/* Collection Info */}
                <div className="p-6 flex flex-col flex-grow bg-white relative">
                  <h2 className="text-xl font-semibold text-[#2C2C2C] mb-2 line-clamp-2 group-hover:text-[#007934] transition-colors duration-300">
                    {collection.title}
                  </h2>
                  {collection.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                      {collection.description}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <span className="text-[#007934] font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      Shop Now
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
          ))}
        </div>
      </div>
    </section>
  );
}
export default Parts;
