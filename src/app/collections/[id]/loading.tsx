import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div>
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

      <div className="bg-[#F4F4F4] lg:px-0 px-5 mx-auto lg:w-full">
        {/* Products Count and Filters */}
        <div className="text-[#2C2C2C] xl:w-[1440px] mx-auto mt-8 pt-3 flex items-center justify-between roboto-condensed text-xl">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="lg:block hidden">
            <div className="flex items-center gap-20">
              <div className="flex items-center gap-3">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="py-12 xl:w-[1440px] mx-auto bg-[#F4F4F4] pt-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-10">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-full">
              {/* Product Image Skeleton */}
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-t animate-pulse" />

              {/* Product Info Skeleton */}
              <div className="bg-white p-5 h-32 rounded-br-3xl">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="flex items-center justify-between mt-5">
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center xl:w-[1440px] mx-auto bg-[#F4F4F4] items-center pb-5 space-x-7">
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
