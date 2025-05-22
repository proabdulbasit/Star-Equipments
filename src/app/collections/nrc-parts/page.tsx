import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNRCCategories } from '@/utils/shopify';

export const dynamic = 'force-dynamic';

export default async function NRCCategoriesPage() {
  try {
    const categories = await getNRCCategories();

    if (!categories || categories.length === 0) {
      return (
        <div className="min-h-screen bg-[#F4F4F4] flex flex-col items-center justify-center px-4">
          <Image
            src="/assets/Homepage/dots-icon.svg"
            alt="dots"
            width={120}
            height={120}
            className="w-[100px] h-[120px] mb-8"
          />
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">
            No Categories Found
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            No NRC categories are currently available. Please check back later.
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
              NRC Parts Categories
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
            <Link
              href="/collections"
              className="hover:text-[#007934] transition-colors"
            >
              Collections
            </Link>
            <span>/</span>
            <span className="text-[#007934]">NRC Parts</span>
          </nav>
        </div>

        {/* Categories Grid */}
        <div className="xl:w-[1440px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.handle}`}
                className="group block h-full"
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
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in NRCCategoriesPage:', error);
    notFound();
  }
}
