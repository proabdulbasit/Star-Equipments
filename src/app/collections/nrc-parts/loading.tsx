export default function NRCCategoriesLoading() {
  // Since we're using persistent layout, just show a simple category grid skeleton
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white rounded-2xl shadow p-4 flex flex-col justify-between min-h-[370px]"
        >
          {/* <div>
            <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-t-2xl overflow-hidden mb-4" />
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
          </div> */}
          <div className="flex items-center justify-between mt-auto">
            <div className="h-7 w-20 bg-green-200 rounded font-bold" />
            <div className="h-10 w-10 bg-green-200 rounded-full flex items-center justify-center">
              <div className="h-5 w-5 bg-white rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
