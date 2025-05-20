'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import Link from 'next/link';
import { FaCirclePlus } from 'react-icons/fa6';
import { addToCart, updateCart, retrieveCart } from '@/utils/shopify';
import { useCart } from '@/context/CartContext';
import { Product } from '@/utils/type';
import { useRouter, useSearchParams } from 'next/navigation';

const sortOptions = [
  { value: 'RELEVANCE', label: 'Featured' },
  { value: 'BEST_SELLING', label: 'Best selling' },
  { value: 'TITLE', label: 'Alphabetically, A-Z', reverse: false },
  { value: 'TITLE', label: 'Alphabetically, Z-A', reverse: true },
  { value: 'PRICE', label: 'Price, low to high', reverse: false },
  { value: 'PRICE', label: 'Price, high to low', reverse: true },
  { value: 'CREATED_AT', label: 'Date, old to new', reverse: false },
  { value: 'CREATED_AT', label: 'Date, new to old', reverse: true },
];

interface ClothingProductProps {
  products: { node: Product }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string;
    startCursor: string;
  };
  currentSort: string;
  currentPriceFrom?: number;
  currentPriceTo?: number;
  currentCursor?: string;
  currentDirection?: string;
}

const Clothing: React.FC<ClothingProductProps> = ({
  products,
  pageInfo,
  currentSort,
  currentPriceFrom,
  currentPriceTo,
  currentCursor,
  currentDirection,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // UI state for dropdowns
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState(
    currentPriceFrom?.toString() || '',
  );
  const [priceTo, setPriceTo] = useState(currentPriceTo?.toString() || '');
  const [sort, setSort] = useState(currentSort);
  const { cart, setCart } = useCart();

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

  const handleSortChange = (value: string) => {
    setSort(value);
    // Reset pagination when sorting changes
    const selectedOption = sortOptions.find((option) => option.value === value);
    updateQuery({
      sort: value,
      reverse: selectedOption?.reverse ? 'true' : 'false',
      cursor: undefined,
      direction: undefined,
    });
  };

  const handlePriceFilter = () => {
    // Reset pagination when price filter changes
    updateQuery({
      priceFrom,
      priceTo,
      cursor: undefined,
      direction: undefined,
    });
    setPriceOpen(false);
  };

  const handleQuickAddToCart = async (variantId: string) => {
    let cartId: any = sessionStorage.getItem('cartId');
    if (cartId) {
      await updateCart(cartId, variantId, 1);
    } else {
      const data: any = await addToCart(variantId, 1);
      cartId = data.cartCreate.cart.id;
      sessionStorage.setItem('cartId', cartId);
    }
    const updatedCart = await retrieveCart(cartId);
    setCart(updatedCart);
    alert('Item added to cart!');
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (pageInfo.hasNextPage) {
      updateQuery({
        cursor: pageInfo.endCursor,
        direction: 'next',
      });
    }
  };

  const handlePrevPage = () => {
    if (pageInfo.hasPreviousPage) {
      updateQuery({
        cursor: pageInfo.startCursor,
        direction: 'prev',
      });
    }
  };

  if (!products || products.length === 0) {
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
        <p className="text-gray-600 mb-8 text-center">
          This collection is currently empty. Please check back later.
        </p>
        <Link
          href="/"
          className="bg-[#007934] text-white px-6 py-3 rounded-md hover:bg-[#006529] transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex bg-[#F4F4F4] items-center">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
          className="lg:w-[100px] lg:h-[120px] lg:mt-0 mt-16 w-[40px] h-[50px]"
        />
        <div className="flex w-full pr-24 lg:mt-0 mt-16 items-center justify-center">
          <h1 className="lg:text-3xl text-sm michroma-regular text-center text-[#2C2C2C]">
            PORTWEST
          </h1>
        </div>
      </div>

      <div className="bg-[#F4F4F4]  lg:px-0 px-5 mx-auto lg:w-full">
        <div className="text-[#2C2C2C]  xl:w-[1440px] mx-auto mt-8 pt-3 flex items-center justify-between  roboto-condensed text-xl">
          <h1>{products.length} Products</h1>
          <div className="flex items-center gap-8">
            {/* Price Filter */}
            <div className="relative">
              <button
                className="border border-gray-300 bg-white rounded px-3 py-1 text-base flex items-center gap-2 min-w-[100px]"
                onClick={() => setPriceOpen((v) => !v)}
                type="button"
              >
                Price
              </button>
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
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-base text-[#2C2C2C]">Sort by:</span>
              <select
                className="text-black bg-white border border-gray-300 rounded px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#007934]"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option
                    key={`${option.value}-${option.reverse}`}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="py-12 xl:w-[1440px] mx-auto bg-[#F4F4F4] pt-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.node.id}
              className="group w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden relative"
            >
              <Link
                href={`/product-detail/${encodeURIComponent(product.node.id)}`}
                className="block"
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
              </Link>
              <div className="flex-1 flex flex-col justify-between p-4">
                <h1 className="roboto-condensed font-semibold text-base text-black mb-2 line-clamp-2 min-h-[48px]">
                  {product.node.title}
                </h1>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-xl font-bold text-[#007934]">
                    ${product.node.priceRange.minVariantPrice.amount}
                  </span>
                  <button
                    className="ml-2 bg-[#007934] hover:bg-[#005f27] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#007934]"
                    onClick={() =>
                      handleQuickAddToCart(
                        product.node.variants.edges[0].node.id,
                      )
                    }
                    aria-label="Add to cart"
                    type="button"
                  >
                    <FaCirclePlus className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center xl:w-[1440px] mx-auto bg-[#F4F4F4] items-center pb-5 space-x-7">
          <button
            onClick={handlePrevPage}
            disabled={!pageInfo.hasPreviousPage}
            className="disabled:opacity-50"
          >
            <FaAngleLeft className="text-xl text-[#2C2C2C]" />
          </button>
          <button
            onClick={handleNextPage}
            disabled={!pageInfo.hasNextPage}
            className="disabled:opacity-50"
          >
            <FaAngleRight className="text-xl text-[#2C2C2C]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clothing;
