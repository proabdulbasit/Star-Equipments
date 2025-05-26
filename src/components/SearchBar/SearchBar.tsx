'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { searchProducts } from '@/utils/shopify';
import { toast } from 'sonner';

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Initialize query from URL params only if we're on the homepage
  useEffect(() => {
    const query = searchParams.get('q');
    if (query && pathname === '/') {
      setSearchQuery(query);
    } else {
      setSearchQuery('');
    }
  }, [searchParams, pathname]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      if (onSearch) {
        onSearch('');
      } else {
        router.push('/');
      }
      return;
    }

    setIsSearching(true);
    try {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to perform search');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, router, onSearch]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    } else {
      router.push('/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim() && onSearch) {
      onSearch('');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search products..."
          className="w-full px-4 py-2.5 pl-10 pr-10 text-sm border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-[#007934] focus:border-transparent
            transition-all duration-300 ease-in-out
            bg-white/90 backdrop-blur-sm
            placeholder-gray-400
            shadow-sm hover:shadow-md"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 group-hover:text-[#007934]" />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-600 transition-colors duration-300
              focus:outline-none focus:ring-2 focus:ring-[#007934] rounded-full p-1"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
      {isSearching && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#007934]"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
