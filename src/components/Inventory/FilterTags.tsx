import React from 'react';
import { IoClose } from 'react-icons/io5';

interface FilterTagsProps {
  filters: {
    type?: string;
    condition?: string;
    make?: string;
    model?: string;
    minPrice?: string;
    maxPrice?: string;
  };
  onRemove: (key: string) => void;
  className?: string;
}

const FilterTags: React.FC<FilterTagsProps> = ({
  filters,
  onRemove,
  className = '',
}) => {
  const activeFilters = Object.entries(filters).filter(([_, value]) => value);

  if (activeFilters.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {activeFilters.map(([key, value]) => {
        // Handle price range display
        if (key === 'minPrice' && filters.maxPrice) {
          return (
            <div
              key="price-range"
              className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm"
            >
              <span>
                Price: ${filters.minPrice} - ${filters.maxPrice}
              </span>
              <button
                onClick={() => {
                  onRemove('minPrice');
                  onRemove('maxPrice');
                }}
                className="hover:bg-green-100 rounded-full p-0.5 transition-colors"
                aria-label="Remove price filter"
              >
                <IoClose className="w-4 h-4" />
              </button>
            </div>
          );
        }

        // Skip maxPrice if minPrice is also present (to avoid duplicate tags)
        if (key === 'maxPrice' && filters.minPrice) {
          return null;
        }

        // Handle individual price filters
        if (key === 'minPrice' || key === 'maxPrice') {
          return (
            <div
              key={key}
              className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm"
            >
              <span className="capitalize">
                {key === 'minPrice' ? 'Min Price' : 'Max Price'}: ${value}
              </span>
              <button
                onClick={() => onRemove(key)}
                className="hover:bg-green-100 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${key} filter`}
              >
                <IoClose className="w-4 h-4" />
              </button>
            </div>
          );
        }

        return (
          <div
            key={key}
            className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm"
          >
            <span className="capitalize">
              {key}: {value}
            </span>
            <button
              onClick={() => onRemove(key)}
              className="hover:bg-green-100 rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${key} filter`}
            >
              <IoClose className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FilterTags;
