'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import Link from 'next/link';
import { FaCirclePlus } from 'react-icons/fa6';
import { updateCart, retrieveCart } from '@/utils/shopify';
import { useCart } from '@/context/CartContext';
import { Product } from '@/utils/type';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { Dialog } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { ImSpinner8 } from 'react-icons/im';

const sortOptions = [
  { value: 'RELEVANCE', label: 'Featured', reverse: false, id: 'relevance' },
  {
    value: 'BEST_SELLING',
    label: 'Best selling',
    reverse: false,
    id: 'best_selling',
  },
  {
    value: 'TITLE',
    label: 'Alphabetically, A-Z',
    reverse: false,
    id: 'title_az',
  },
  {
    value: 'TITLE',
    label: 'Alphabetically, Z-A',
    reverse: true,
    id: 'title_za',
  },
  {
    value: 'PRICE',
    label: 'Price, low to high',
    reverse: false,
    id: 'price_low',
  },
  {
    value: 'PRICE',
    label: 'Price, high to low',
    reverse: true,
    id: 'price_high',
  },
  { value: 'ID', label: 'Date, old to new', reverse: false, id: 'date_old' },
  { value: 'ID', label: 'Date, new to old', reverse: true, id: 'date_new' },
];

interface ClothingProductProps {
  products: { node: Product }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasMoreProducts?: boolean;
  };
  currentSort: string;
  currentPriceFrom?: number;
  currentPriceTo?: number;
  currentPage: number;
  collectionId: string;
}

const ProductGridLoader = () => {
  return (
    <div className="py-12 lg:px-10 xl:w-[1440px] mx-auto bg-[#F4F4F4] pt-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-10">
      {[...Array(8)].map((_, idx) => (
        <div
          key={idx}
          className="group w-full bg-white rounded-2xl shadow-md flex flex-col overflow-hidden relative animate-pulse"
        >
          <div className="relative w-full aspect-[4/3] bg-gray-200" />
          <div className="flex-1 flex flex-col justify-between p-4">
            <div className="space-y-3">
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
            <div className="flex items-end justify-between mt-auto">
              <div className="h-6 w-24 bg-gray-200 rounded" />
              <div className="h-10 w-10 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Clothing: React.FC<ClothingProductProps> = ({
  products,
  pageInfo,
  currentSort,
  currentPriceFrom,
  currentPriceTo,
  currentPage,
  collectionId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // UI state for dropdowns
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState(
    currentPriceFrom?.toString() || '',
  );
  const [priceTo, setPriceTo] = useState(currentPriceTo?.toString() || '');
  // Find the initial sort option based on currentSort and reverse
  const initialSortOption = sortOptions.find(
    (option) =>
      option.value === currentSort &&
      option.reverse === (searchParams.get('reverse') === 'true'),
  );
  const [selectedSortId, setSelectedSortId] = useState(
    initialSortOption?.id || 'relevance',
  );
  const { cart, setCart, addToCart } = useCart();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isAdding, setIsAdding] = useState<Record<string, boolean>>({});

  // Get min/max price
  const prices = products
    .map((p) => parseFloat(p?.node?.priceRange?.minVariantPrice?.amount ?? '0'))
    .filter((n) => !isNaN(n));
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  // Handlers to update URL/query params
  const updateQuery = (params: Record<string, string | number | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
    router.push(`?${newParams.toString()}`);
  };

  const handleSortChange = (selectedId: string) => {
    // Find the selected option using the id
    const selectedOption = sortOptions.find(
      (option) => option.id === selectedId,
    );

    if (!selectedOption) {
      console.error('Invalid sort option selected:', selectedId);
      return;
    }

    setSelectedSortId(selectedId);

    updateQuery({
      sort: selectedOption.value,
      reverse: selectedOption.reverse ? 'true' : 'false',
      page: 1,
    });
  };

  const handlePriceFilter = () => {
    const fromPrice = priceFrom ? parseFloat(priceFrom) : undefined;
    const toPrice = priceTo ? parseFloat(priceTo) : undefined;

    updateQuery({
      'filter.v.price.gte': fromPrice,
      'filter.v.price.lte': toPrice,
      page: 1,
      cursor: undefined,
      direction: undefined,
    });
    setPriceOpen(false);
  };

  const handleQuickAddToCart = async (variantId: string) => {
    console.log('handleQuickAddToCart called with variantId:', variantId);
    if (!variantId) {
      console.log('No variant ID available');
      toast.error('Product variant not available');
      return;
    }

    setIsAdding((prev) => ({ ...prev, [variantId]: true }));
    try {
      console.log('Attempting to add to cart...');
      await addToCart(variantId, 1);
      console.log('Successfully added to cart');
      toast.success('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsAdding((prev) => ({ ...prev, [variantId]: false }));
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;

    if (newPage < 1) return;

    if (newPage > pageInfo.totalPages) return;

    updateQuery({ page: newPage });
  };

  const isLastPage = currentPage >= pageInfo.totalPages;

  if (!products || products.length === 0) {
    // Determine if any filters are active
    const filtersActive = !!(
      currentPriceFrom ||
      currentPriceTo ||
      (currentSort && currentSort !== 'RELEVANCE')
    );
    const collectionUrl = `/collections/${collectionId}`;
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F4F4F4] px-4">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
          className="w-[100px] h-[120px] mb-8"
        />
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">
          No Products Found
        </h1>
        {filtersActive ? (
          <>
            <p className="text-gray-600 mb-8 text-center">
              No products match your filters. Try resetting your filters.
            </p>
            <button
              className="bg-[#007934] text-white px-6 py-3 rounded-md hover:bg-[#006529] transition-colors mb-2"
              onClick={() => {
                // Remove all filters and reload collection
                router.push(collectionUrl);
              }}
            >
              Reset Filters
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-8 text-center">
              This collection is currently empty. Please check back later.
            </p>
            <Link
              href={collectionUrl}
              className="bg-[#007934] text-white px-6 py-3 rounded-md hover:bg-[#006529] transition-colors"
            >
              Return to Collection
            </Link>
          </>
        )}
      </div>
    );
  }

  const title = collectionId
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div>
      <div className="flex lg:mt-16 mt-0 items-center max-w-[1440px] mx-auto lg:px-10 px-5 lg:py-0 py-4">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
          className="lg:w-[100px] lg:h-[120px] lg:mt-0 mt-4 w-[40px] h-[50px]"
        />
        <div className="flex w-full pr-24 lg:mt-0 mt-4 max-w-[1440px] mx-auto">
          <h1 className="lg:text-3xl text-lg michroma-regular lg:text-center text-left text-[#2C2C2C]">
            {title}
          </h1>
        </div>
      </div>

      <div className="bg-[#F4F4F4]  lg:px-12 px-5 mx-auto lg:w-full ">
        {/* Mobile: Filter & Sort Button at top */}
        <div className="lg:hidden flex flex-col gap-5 pt-4">
          <button
            className="bg-[#007934] text-white px-4 py-2 rounded font-semibold text-base flex items-center justify-center gap-2 shadow hover:bg-[#005f27] w-full mb-2"
            onClick={() => setMobileFilterOpen(true)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-4.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z"
              />
            </svg>
            Filter & Sort
          </button>
        </div>
        {/* Mobile: Product count below button */}
        <div className="lg:hidden text-base font-semibold text-[#2C2C2C] mb-2 mt-2">
          Showing {products.length} of{' '}
          {pageInfo.hasMoreProducts ? '1000+' : pageInfo.totalProducts} Products
        </div>
        {/* Desktop: Inline filter/sort */}
        <div className="text-[#2C2C2C] lg:px-10 px-5  xl:w-[1440px] mx-auto mt-8 pt-3 items-center justify-between roboto-condensed text-xl hidden lg:flex">
          <h1>
            Showing {products.length} of{' '}
            {pageInfo.hasMoreProducts ? '1000+' : pageInfo.totalProducts}{' '}
            Products
            {pageInfo.hasMoreProducts && ' (More available)'}
          </h1>
          <div className="flex items-center gap-8">
            {/* Price filter (desktop) */}
            <div className="relative">
              {/* <button
                className="border border-gray-300 bg-white rounded px-3 py-1 text-base flex items-center gap-2 min-w-[100px]"
                onClick={() => setPriceOpen((v) => !v)}
                type="button"
              >
                Price
              </button> */}
              {priceOpen && (
                <div className="absolute z-20 mt-2 w-80 bg-white border border-gray-200 rounded shadow-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">
                      The highest price is{' '}
                      <span className="font-semibold">
                        ${maxPrice.toFixed(2)}
                      </span>
                    </span>
                    <button
                      className="text-xs text-[#007934] underline"
                      onClick={() => {
                        setPriceFrom('');
                        setPriceTo('');
                        handlePriceFilter();
                      }}
                      type="button"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="flex flex-col flex-1">
                      <label className="text-xs mb-1">From</label>
                      <input
                        type="number"
                        min={minPrice}
                        max={maxPrice}
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                        placeholder={`$${minPrice.toFixed(2)}`}
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label className="text-xs mb-1">To</label>
                      <input
                        type="number"
                        min={minPrice}
                        max={maxPrice}
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                        placeholder={`$${maxPrice.toFixed(2)}`}
                      />
                    </div>
                  </div>
                  <button
                    className="mt-4 w-full bg-[#007934] text-white py-2 rounded hover:bg-[#005f27] transition-colors"
                    onClick={handlePriceFilter}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
            {/* Sort (desktop) */}
            <div className="flex items-center gap-3">
              <span className="text-base text-[#2C2C2C]">Sort by:</span>
              <select
                className="text-black bg-white border border-gray-300 rounded px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#007934]"
                value={selectedSortId}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Mobile Filter & Sort Modal */}
        <Dialog
          open={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          className="relative z-50 lg:hidden"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <div className="fixed inset-0 flex items-end sm:items-center justify-center">
            <Dialog.Panel className="w-full max-w-md mx-auto bg-white rounded-t-2xl sm:rounded-2xl p-6 shadow-xl relative animate-fadeInUp">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close"
              >
                <IoClose className="w-6 h-6" />
              </button>
              <Dialog.Title className="text-lg font-bold text-center mb-2">
                Filter & Sort
              </Dialog.Title>
              <div className="text-center text-gray-500 text-sm mb-4">
                {products.length} of{' '}
                {pageInfo.hasMoreProducts ? '1000+' : pageInfo.totalProducts}{' '}
                products
              </div>
              {/* Price Filter */}
              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={minPrice}
                    max={maxPrice}
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-2 w-1/2"
                    placeholder={`From $${minPrice.toFixed(2)}`}
                  />
                  <input
                    type="number"
                    min={minPrice}
                    max={maxPrice}
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-2 w-1/2"
                    placeholder={`To $${maxPrice.toFixed(2)}`}
                  />
                </div>
              </div> */}
              {/* Sort Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-2 py-2"
                  value={selectedSortId}
                  onChange={(e) => setSelectedSortId(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center mt-8 gap-4">
                <button
                  className="text-[#007934] underline text-base"
                  onClick={() => {
                    setPriceFrom('');
                    setPriceTo('');
                    setSelectedSortId('relevance');
                  }}
                  type="button"
                >
                  Clear all
                </button>
                <button
                  className="bg-[#007934] text-white px-6 py-2 rounded font-semibold text-base shadow hover:bg-[#005f27]"
                  onClick={() => {
                    // Apply both sort and price filter in one URL update
                    const selectedOption =
                      sortOptions.find(
                        (option) => option.id === selectedSortId,
                      ) || sortOptions[0];
                    const fromPrice = priceFrom
                      ? parseFloat(priceFrom)
                      : undefined;
                    const toPrice = priceTo ? parseFloat(priceTo) : undefined;
                    const params: Record<string, string | number | undefined> =
                      {
                        sort: selectedOption.value,
                        reverse: selectedOption.reverse ? 'true' : undefined,
                        'filter.v.price.gte': fromPrice,
                        'filter.v.price.lte': toPrice,
                        page: 1,
                        cursor: undefined,
                        direction: undefined,
                      };
                    // Remove undefined or empty
                    Object.keys(params).forEach((key) => {
                      if (params[key] === undefined || params[key] === '') {
                        delete params[key];
                      }
                    });
                    updateQuery(params);
                    setMobileFilterOpen(false);
                  }}
                  type="button"
                >
                  Apply
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        <Suspense fallback={<ProductGridLoader />}>
          <div className="py-12 lg:px-10 xl:w-[1440px] mx-auto bg-[#F4F4F4] pt-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-10">
            {products.map((product) => (
              <div
                key={product.node.id}
                className="group w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden relative"
              >
                <Link
                  href={`/product-detail/${encodeURIComponent(product.node.id)}`}
                  className="block flex-1"
                  tabIndex={-1}
                >
                  <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={
                        product.node.featuredImage?.url ??
                        '/placeholder-image.jpg'
                      }
                      alt={product.node.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <h1 className="roboto-condensed font-semibold text-base text-black mb-2 line-clamp-2 min-h-[48px] group-hover:underline group-hover:text-[#007934]">
                      {product.node.title}
                    </h1>
                    <div className="flex items-end justify-between mt-auto">
                      <span className="text-xl font-bold text-[#007934]">
                        ${product.node.priceRange.minVariantPrice.amount}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  className="absolute bottom-3 right-6 bg-[#007934] hover:bg-[#005f27] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#007934] z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleQuickAddToCart(
                      product.node.variants.edges[0].node.id,
                    );
                  }}
                  aria-label="Add to cart"
                  type="button"
                  disabled={isAdding[product.node.variants.edges[0].node.id]}
                >
                  {isAdding[product.node.variants.edges[0].node.id] ? (
                    <ImSpinner8 className="text-2xl animate-spin" />
                  ) : (
                    <FaCirclePlus className="text-2xl" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </Suspense>

        <div className="flex justify-center xl:w-[1440px] mx-auto bg-[#F4F4F4] items-center pb-5 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`transition-opacity ${
              currentPage <= 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:opacity-80'
            }`}
            aria-label="Previous page"
          >
            <FaAngleLeft className="text-xl text-[#2C2C2C]" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1)
              .filter((pageNum) => {
                return (
                  pageNum === 1 ||
                  pageNum === pageInfo.totalPages ||
                  Math.abs(pageNum - currentPage) <= 1
                );
              })
              .map((pageNum, index, array) => {
                const showEllipsisBefore =
                  index > 0 && pageNum - array[index - 1] > 1;
                const showEllipsisAfter =
                  index < array.length - 1 && array[index + 1] - pageNum > 1;

                return (
                  <React.Fragment key={pageNum}>
                    {showEllipsisBefore && (
                      <span className="text-[#2C2C2C]">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                        ${
                          currentPage === pageNum
                            ? 'bg-[#007934] text-white'
                            : 'text-[#2C2C2C] hover:bg-gray-100'
                        }`}
                      disabled={currentPage === pageNum}
                    >
                      {pageNum}
                    </button>
                    {showEllipsisAfter && (
                      <span className="text-[#2C2C2C]">...</span>
                    )}
                  </React.Fragment>
                );
              })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isLastPage || !pageInfo.hasNextPage}
            className={`transition-opacity ${
              isLastPage || !pageInfo.hasNextPage
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:opacity-80'
            }`}
            aria-label="Next page"
          >
            <FaAngleRight className="text-xl text-[#2C2C2C]" />
          </button>

          <span className="text-sm text-[#2C2C2C] ml-4">
            Page {currentPage} of {pageInfo.totalPages}
            {pageInfo.hasMoreProducts && ' (More products available)'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Clothing;
