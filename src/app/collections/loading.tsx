import React from 'react';
import Image from 'next/image';

export default function CollectionsLoading() {
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
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="xl:w-[1440px] mx-auto px-4 py-4">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          <span>/</span>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Collections Grid */}
      <div className="xl:w-[1440px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden h-full flex flex-col transform"
            >
              {/* Image Skeleton */}
              <div className="relative w-full aspect-[4/3] bg-gray-200 animate-pulse" />

              {/* Content Skeleton */}
              <div className="p-6 flex flex-col flex-grow bg-white">
                {/* Title Skeleton */}
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />

                {/* Description Skeletons */}
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-4" />

                {/* View Collection Link Skeleton */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
