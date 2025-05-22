import Image from 'next/image';

export default function ProductDetailSkeleton() {
  return (
    <>
      <div className="flex flex-col lg:flex-row mb-10 mt-24 w-[90%] lg:w-[1400px] mx-auto bg-white rounded-lg p-6 gap-10 animate-pulse">
        <div className="flex-1 flex items-center justify-center bg-gray-100 p-6 rounded-lg border border-gray-100 min-h-[350px] max-w-[420px]" />
        <div className="flex-1 flex flex-col gap-6 justify-start">
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-2" />
          <div className="h-6 w-1/4 bg-gray-200 rounded mb-1" />
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded" />
              <div className="w-12 h-10 bg-gray-200 rounded" />
              <div className="w-10 h-10 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <div className="w-[220px] h-[55px] bg-gray-200 rounded-full" />
            <div className="w-[220px] h-[55px] bg-gray-200 rounded-full" />
          </div>
          <div className="h-4 w-32 bg-gray-200 rounded mt-1 mb-2" />
          <div className="h-4 w-20 bg-gray-200 rounded mt-2" />
        </div>
      </div>
      <div className="flex bg-[#F4F4F4] items-center mt-10">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
        />
        <div className="flex w-full pr-24 items-center justify-center">
          <div className="h-8 w-48 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="xl:w-[1440px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="group w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden relative animate-pulse"
            >
              <div className="relative w-full aspect-[4/3] bg-gray-200 flex items-center justify-center overflow-hidden" />
              <div className="flex-1 flex flex-col justify-between p-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="flex items-end justify-between mt-auto">
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
                  <div className="ml-2 h-10 w-10 bg-gray-200 rounded-full mt-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
