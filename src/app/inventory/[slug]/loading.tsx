'use client';
import React from 'react';

export default function VehicleDetailLoading() {
  return (
    <div className="lg:w-[1440px] mx-auto mt-10 overflow-visible font-sans p-4 lg:p-10">
      {/* Breadcrumbs skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <div className="w-full lg:w-1/2 rounded-2xl p-0 flex flex-col gap-0 border border-gray-100 animate-fadeInUp">
          <div className="w-full h-80 bg-gray-200 rounded-2xl animate-pulse mb-4" />
        </div>
        <div className="w-full lg:w-1/2 backdrop-blur-xl rounded-2xl md:p-8 flex flex-col gap-6 border border-gray-100 animate-fadeInUp">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse mb-2" />
          <div className="border-t border-gray-200 my-2" />
          <div className="flex gap-3 flex-wrap mb-2">
            <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse" />
          </div>
          <div className="bg-white/90 rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="bg-white/90 rounded-2xl shadow p-6 border border-gray-100 animate-fadeInUp">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="bg-white/90 rounded-2xl shadow p-6 border border-gray-100 animate-fadeInUp">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      {/* Mobile action bar skeleton */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden bg-white/95 backdrop-blur-md shadow-t px-4 py-3 gap-3 justify-center animate-fadeInUp">
        <div className="h-12 w-1/3 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-12 w-1/3 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-12 w-1/3 bg-gray-200 rounded-xl animate-pulse" />
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
