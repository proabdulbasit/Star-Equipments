import Image from 'next/image';

export default function ProductGridSkeleton() {
  return (
    <div className="xl:w-[1440px] w-[95%] mx-auto">
      {/* Mobile: Filter & Sort button skeleton and product count skeleton */}
      <div className="lg:hidden flex flex-col gap-3 pt-4">
        <div className="h-12 w-full bg-green-200 rounded animate-pulse mb-2" />
        <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-2" />
      </div>
      {/* Desktop: Top bar skeleton */}
      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center mt-8 mb-4 gap-4 sm:gap-0 justify-between">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="flex gap-4 items-center">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Product grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white rounded-2xl shadow p-4 flex flex-col justify-between min-h-[370px]"
          >
            <div>
              <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-t-2xl overflow-hidden mb-4" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="h-7 w-20 bg-green-200 rounded font-bold" />
              <div className="h-10 w-10 bg-green-200 rounded-full flex items-center justify-center">
                <div className="h-5 w-5 bg-white rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots skeleton */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
