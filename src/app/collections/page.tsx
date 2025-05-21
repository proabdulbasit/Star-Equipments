import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCollections } from '@/utils/shopify';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

export default async function CollectionsPage() {
  try {
    const allCollections = await getAllCollections();

    const collectionsWithCounts = await Promise.all(
      SPECIFIC_COLLECTIONS.map(async (collection) => {
        const matchingCollection = allCollections?.find(
          (c) => c.handle === collection.handle,
        );
        return {
          ...collection,
          id: matchingCollection?.id || collection.handle,
          productsCount: matchingCollection?.productsCount || 0,
        };
      }),
    );

    if (!collectionsWithCounts || collectionsWithCounts.length === 0) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F4F4F4] px-4">
          <Image
            src="/assets/Homepage/dots-icon.svg"
            alt="dots"
            width={120}
            height={120}
            className="w-[100px] h-[120px] mb-8"
          />
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">
            No Collections Found
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            There are no collections available at the moment.
          </p>
          <Link
            href="/"
            className="bg-[#007934] text-white px-6 py-3 rounded-md hover:bg-[#006529] transition-colors"
          >
            Return Home
          </Link>
        </div>
      );
    }

    return (
      <div className="bg-[#F4F4F4] min-h-screen">
        {/* Header Section */}
        <div className="flex bg-[#F4F4F4] items-center">
          <Image
            src="/assets/Homepage/dots-icon.svg"
            alt="dots"
            width={120}
            height={120}
            className="lg:w-[100px] lg:h-[120px] lg:mt-0 mt-16 w-[40px] h-[50px]"
          />
          <div className="flex w-full pr-24 lg:mt-0 mt-16 items-center justify-center">
            <h1 className="lg:text-3xl text-sm michroma-regular text-center text-[#2C2C2C]">
              Collections
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="xl:w-[1440px] mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#007934] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#007934]">Collections</span>
          </nav>
        </div>

        {/* Collections Grid */}
        <div className="xl:w-[1440px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {collectionsWithCounts.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group block h-full"
              >
                <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
                  {/* Collection Image Container */}
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    {/* Image */}
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Product Count Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-[#007934] font-medium text-sm">
                        {collection.productsCount} Products
                      </span>
                    </div>
                  </div>

                  {/* Collection Info */}
                  <div className="p-6 flex flex-col flex-grow bg-white relative">
                    {/* Title */}
                    <h2 className="text-xl font-semibold text-[#2C2C2C] mb-2 line-clamp-2 group-hover:text-[#007934] transition-colors duration-300">
                      {collection.title}
                    </h2>

                    {/* Description */}
                    {collection.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                        {collection.description}
                      </p>
                    )}

                    {/* View Collection Link */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <span className="text-[#007934] font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        View Collection
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
      </div>
    );
  } catch (error) {
    console.error('Error in CollectionsPage:', error);
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F4F4F4] px-4">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
          className="w-[100px] h-[120px] mb-8"
        />
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">
          Something Went Wrong
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          We&apos;re having trouble loading the collections. Please try again
          later.
        </p>
        <Link
          href="/"
          className="bg-[#007934] text-white px-6 py-3 rounded-md hover:bg-[#006529] transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }
}
