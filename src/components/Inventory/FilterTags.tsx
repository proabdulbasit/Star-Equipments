import React from 'react';
import { IoClose } from 'react-icons/io5';

interface FilterTagsProps {
  filters: {
    type?: string;
    condition?: string;
    make?: string;
    model?: string;
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
      {activeFilters.map(([key, value]) => (
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
      ))}
    </div>
  );
};

export default FilterTags;
