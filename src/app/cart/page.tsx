'use client';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Cart = dynamic(() => import('@/features/Cart'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F4]">
      <div className="xl:w-[1440px] w-[95%] mx-auto">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="lg:flex items-center justify-between mb-10 animate-pulse"
          >
            <div className="flex mt-14 gap-5 xl:w-[600px] items-center">
              <div className="bg-gray-200 rounded-lg w-[140px] h-[140px]" />
              <div className="space-y-3">
                <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
                <div className="h-6 w-24 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-5 lg:gap-12 mt-8 lg:mt-0">
              <div className="flex items-center justify-between p-1 w-[120px] h-[40px] border rounded-full border-[#2C2C2C] bg-gray-100">
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
                <div className="h-4 w-6 bg-gray-200 rounded" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
              </div>
              <div className="bg-gray-200 rounded-full w-[30px] h-[30px] flex justify-center items-center" />
              <div className="lg:hidden block">
                <div className="h-6 w-16 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="lg:block hidden">
              <div className="h-8 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F4]">
          <div className="xl:w-[1440px] w-[95%] mx-auto">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="lg:flex items-center justify-between mb-10 animate-pulse"
              >
                <div className="flex mt-14 gap-5 xl:w-[600px] items-center">
                  <div className="bg-gray-200 rounded-lg w-[140px] h-[140px]" />
                  <div className="space-y-3">
                    <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-5 lg:gap-12 mt-8 lg:mt-0">
                  <div className="flex items-center justify-between p-1 w-[120px] h-[40px] border rounded-full border-[#2C2C2C] bg-gray-100">
                    <div className="h-6 w-6 bg-gray-200 rounded-full" />
                    <div className="h-4 w-6 bg-gray-200 rounded" />
                    <div className="h-6 w-6 bg-gray-200 rounded-full" />
                  </div>
                  <div className="bg-gray-200 rounded-full w-[30px] h-[30px] flex justify-center items-center" />
                  <div className="lg:hidden block">
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="lg:block hidden">
                  <div className="h-8 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <Cart />
    </Suspense>
  );
}
