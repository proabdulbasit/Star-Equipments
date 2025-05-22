import React from 'react';

export default function InventoryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8fb] to-[#e6f2ed]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
        {/* Search and Sort Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="w-full lg:w-96 h-10 bg-gray-200 animate-pulse rounded" />
            <div className="flex items-center gap-4">
              <div className="w-32 h-10 bg-gray-200 animate-pulse rounded" />
              <div className="w-40 h-10 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden w-full">
            <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg" />
          </div>

          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Filter Sections */}
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-24 h-6 bg-gray-200 animate-pulse rounded mb-4" />
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-8 bg-gray-200 animate-pulse rounded"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Image */}
                  <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse" />

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div className="w-3/4 h-5 bg-gray-200 animate-pulse rounded" />
                    <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded" />
                    <div className="flex items-center justify-between">
                      <div className="w-24 h-6 bg-gray-200 animate-pulse rounded" />
                      <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
