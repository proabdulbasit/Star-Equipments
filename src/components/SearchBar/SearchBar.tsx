'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { searchProducts, getAllProductTitles } from '@/utils/shopify';
import { toast } from 'sonner';
import Image from 'next/image';

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [allTitles, setAllTitles] = useState<
    { title: string; handle: string }[]
  >([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    { title: string; handle: string }[]
  >([]);
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Fetch product results when searchQuery changes
  useEffect(() => {
    let active = true;
    if (searchQuery.trim()) {
      setIsSearching(true);
      searchProducts(searchQuery, { pageSize: 4 })
        .then((res) => {
          if (active) setResults(res.products.map((p: any) => p.node));
        })
        .catch(() => setResults([]))
        .finally(() => setIsSearching(false));
    } else {
      setResults([]);
      setIsSearching(false);
    }
    return () => {
      active = false;
    };
  }, [searchQuery]);

  // Fetch all product titles on mount
  useEffect(() => {
    getAllProductTitles().then(setAllTitles);
  }, []);

  // Filter suggestions as user types
  useEffect(() => {
    if (isFocused && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      setFilteredSuggestions(
        allTitles
          .filter((item) => item.title.toLowerCase().includes(q))
          .slice(0, 5),
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchQuery, isFocused, allTitles]);

  // Handle outside click to close popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
        setIsFocused(false);
      }
    }
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  const handleSearch = useCallback(
    async (queryOverride?: string) => {
      const query =
        typeof queryOverride === 'string' ? queryOverride : searchQuery;
      if (!query.trim()) {
        if (onSearch) {
          onSearch('');
        } else {
          router.push('/');
        }
        setShowPopup(false);
        return;
      }
      setIsSearching(true);
      try {
        if (onSearch) {
          onSearch(query);
        } else {
          router.push(`/?q=${encodeURIComponent(query.trim())}`);
        }
        setShowPopup(false);
      } catch (error) {
        console.error('Search error:', error);
        toast.error('Failed to perform search');
      } finally {
        setIsSearching(false);
      }
    },
    [searchQuery, router, onSearch],
  );

  // Debounced search effect
  useEffect(() => {
    if (!isFocused) return;
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        // Only fetch, don't navigate
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, isFocused]);

  const handleClear = () => {
    setSearchQuery('');
    setResults([]);
    if (onSearch) {
      onSearch('');
    } else {
      router.push('/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowPopup(true);
    if (!value.trim() && onSearch) {
      onSearch('');
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowPopup(true);
  };

  // Handle suggestion click
  const handleSuggestionClick = (title: string) => {
    setSearchQuery(title);
    handleSearch(title);
    setShowPopup(false);
  };

  // Handle product click
  const handleProductClick = (id: string) => {
    router.push(`/product-detail/${encodeURIComponent(id)}`);
    setShowPopup(false);
  };

  // Handle 'View all results' click
  const handleViewAll = () => {
    handleSearch();
    setShowPopup(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}
      >
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={handleFocus}
          placeholder="Search products..."
          className="w-full px-4 py-2.5 pl-12 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007934] focus:border-transparent transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-sm placeholder-gray-400 shadow-sm hover:shadow-md"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 group-hover:text-[#007934] w-6 h-6" />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#007934] rounded-full p-1"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
      {showPopup && (
        <div
          ref={popupRef}
          className="absolute left-1/2 -translate-x-1/2 mt-2 w-[280px] max-w-[98vw] bg-white rounded-xl shadow-2xl z-50 border border-gray-100 animate-fadeInUp"
        >
          <div className="p-4 w-full">
            <div className="mb-2 text-xs text-gray-500 font-semibold">
              PRODUCTS
            </div>
            <ul>
              {searchQuery.trim() ? (
                <>
                  {results.slice(0, 4).map((product) => (
                    <li
                      key={product.id}
                      className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 rounded px-2"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <Image
                        src={
                          product.featuredImage?.url || '/placeholder-image.jpg'
                        }
                        alt={product.title}
                        width={40}
                        height={40}
                        className="rounded object-contain"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-gray-800 line-clamp-2 max-w-[180px]">
                          {product.title}
                        </span>
                        <span className="text-xs text-[#007934] font-semibold">
                          ${product.priceRange?.minVariantPrice?.amount}
                        </span>
                      </div>
                    </li>
                  ))}
                  {!isSearching && results.length === 0 && (
                    <li className="text-gray-400 text-sm py-2">
                      No products found
                    </li>
                  )}
                  {isSearching && (
                    <li className="flex items-center gap-2 py-2 text-gray-400 text-sm">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#007934]"></span>
                      Searching...
                    </li>
                  )}
                </>
              ) : (
                <li className="text-gray-400 text-sm py-2">
                  Start typing to search products
                </li>
              )}
            </ul>
          </div>
          <button
            className={`w-full text-center py-3 text-[#007934] font-semibold border-t border-gray-100 transition ${
              !searchQuery.trim()
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-50'
            }`}
            onClick={handleViewAll}
            disabled={!searchQuery.trim()}
          >
            View all{' '}
            <span className="font-bold">
              {searchQuery.trim() || 'products'}
            </span>{' '}
            products
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
