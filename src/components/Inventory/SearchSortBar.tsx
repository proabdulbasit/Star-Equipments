import { IoSearch } from 'react-icons/io5';
import { FaFilter } from 'react-icons/fa';

const SearchSortBar = ({
  search,
  setSearch,
  sort,
  setSort,
  resultCount,
}: any) => (
  <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm">
    {/* Search Input with Icon */}
    <div className="relative flex-1 w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <IoSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search vehicles by name, make, model..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200"
      />
    </div>

    {/* Sort Dropdown */}
    <div className="flex items-center gap-4 w-full md:w-auto">
      <div className="relative flex-1 md:flex-none">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full md:w-48 pl-4 pr-10 py-3 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200 cursor-pointer"
        >
          <option value="default">Default Sort</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title: A-Z</option>
          <option value="title-desc">Title: Z-A</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Results Count */}
      <div className="hidden md:flex items-center gap-2 text-gray-600">
        <span className="font-medium">{resultCount}</span>
        <span>Results</span>
      </div>
    </div>
  </div>
);

export default SearchSortBar;
