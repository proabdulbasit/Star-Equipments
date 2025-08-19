'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import vehicleData from '@/data/vehicleData.json';
import SearchSortBar from '@/components/Inventory/SearchSortBar';
import Filters from '@/components/Inventory/Filters';
import VehicleCard from '@/components/Inventory/VehicleCard';
import Pagination from '@/components/Inventory/Pagination';
import { FaFilter, FaTools } from 'react-icons/fa';
import FilterTags from '@/components/Inventory/FilterTags';
import { useRef } from 'react';

const PAGE_SIZE = 9;

export default function InventoryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listTopRef = useRef<HTMLDivElement | null>(null);

  // Initialize state from URL params
  const [type, setType] = useState(searchParams.get('type') || '');
  const [condition, setCondition] = useState(
    searchParams.get('condition') || '',
  );
  const [make, setMake] = useState(searchParams.get('make') || '');
  const [model, setModel] = useState(searchParams.get('model') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'default');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const types = useMemo(
    () => Array.from(new Set(vehicleData.map((v) => v.type))).filter(Boolean),
    [],
  );
  const conditions = useMemo(
    () =>
      Array.from(new Set(vehicleData.map((v) => v.condition))).filter(Boolean),
    [],
  );
  const makes = useMemo(
    () => Array.from(new Set(vehicleData.map((v) => v.make))).filter(Boolean),
    [],
  );
  const models = useMemo(
    () => Array.from(new Set(vehicleData.map((v) => v.model))).filter(Boolean),
    [],
  );

  const filteredVehicles = useMemo(() => {
    let filtered = vehicleData;
    if (type) filtered = filtered.filter((v) => v.type === type);
    if (condition) filtered = filtered.filter((v) => v.condition === condition);
    if (make) filtered = filtered.filter((v) => v.make === make);
    if (model) filtered = filtered.filter((v) => v.model === model);
    if (search && search.trim()) {
      const searchTerm = search.trim().toLowerCase();
      filtered = filtered.filter((v) =>
        v.title.toLowerCase().includes(searchTerm),
      );
    }

    // Price filtering
    if (minPrice || maxPrice) {
      filtered = filtered.filter((v) => {
        const price = v.price;
        if (price === 'Call for Price') return true; // Include "Call for Price" items

        const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
        if (isNaN(numericPrice)) return true; // Include items with non-numeric prices

        const min = minPrice ? parseInt(minPrice) : 0;
        const max = maxPrice ? parseInt(maxPrice) : Infinity;

        return numericPrice >= min && numericPrice <= max;
      });
    }

    if (sort === 'price-asc')
      filtered = [...filtered].sort((a, b) => {
        const priceA =
          a.price === 'Call for Price'
            ? Infinity
            : parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const priceB =
          b.price === 'Call for Price'
            ? Infinity
            : parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return priceA - priceB;
      });
    if (sort === 'price-desc')
      filtered = [...filtered].sort((a, b) => {
        const priceA =
          a.price === 'Call for Price'
            ? 0
            : parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const priceB =
          b.price === 'Call for Price'
            ? 0
            : parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return priceB - priceA;
      });
    if (sort === 'title-asc')
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'title-desc')
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    return filtered;
  }, [type, condition, make, model, search, sort, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredVehicles.length / PAGE_SIZE);
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredVehicles.slice(start, start + PAGE_SIZE);
  }, [filteredVehicles, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || newPage < 1) return;
    const maxPage = Math.max(1, Math.ceil(filteredVehicles.length / PAGE_SIZE));
    if (newPage > maxPage) return;

    setCurrentPage(newPage);

    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (condition) params.set('condition', condition);
    if (make) params.set('make', make);
    if (model) params.set('model', model);
    if (search?.trim()) params.set('search', search.trim());
    if (sort && sort !== 'default') params.set('sort', sort);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (newPage > 1) params.set('page', String(newPage));

    const newUrl = params.toString() ? `?${params.toString()}` : '/inventory';
    router.replace(newUrl, { scroll: false });

    // Smooth scroll to the top of the product list
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        listTopRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  // Batch update function for multiple filter changes
  const handleBatchFilterChange = (updates: { [key: string]: string }) => {
    // Update all states first
    Object.entries(updates).forEach(([key, value]) => {
      switch (key) {
        case 'type':
          setType(value);
          break;
        case 'condition':
          setCondition(value);
          break;
        case 'make':
          setMake(value);
          break;
        case 'model':
          setModel(value);
          break;
        case 'search':
          setSearch(value);
          break;
        case 'sort':
          setSort(value);
          break;
        case 'minPrice':
          setMinPrice(value);
          break;
        case 'maxPrice':
          setMaxPrice(value);
          break;
      }
    });

    setCurrentPage(1);

    // Build URL params with all updated values
    const params = new URLSearchParams();
    const finalType = updates.type !== undefined ? updates.type : type;
    const finalCondition =
      updates.condition !== undefined ? updates.condition : condition;
    const finalMake = updates.make !== undefined ? updates.make : make;
    const finalModel = updates.model !== undefined ? updates.model : model;
    const finalSearch = updates.search !== undefined ? updates.search : search;
    const finalSort = updates.sort !== undefined ? updates.sort : sort;
    const finalMinPrice =
      updates.minPrice !== undefined ? updates.minPrice : minPrice;
    const finalMaxPrice =
      updates.maxPrice !== undefined ? updates.maxPrice : maxPrice;

    if (finalType) params.set('type', finalType);
    if (finalCondition) params.set('condition', finalCondition);
    if (finalMake) params.set('make', finalMake);
    if (finalModel) params.set('model', finalModel);
    if (finalSearch?.trim()) params.set('search', finalSearch.trim());
    if (finalSort && finalSort !== 'default') params.set('sort', finalSort);
    if (finalMinPrice) params.set('minPrice', finalMinPrice);
    if (finalMaxPrice) params.set('maxPrice', finalMaxPrice);

    const newUrl = params.toString() ? `?${params.toString()}` : '/inventory';
    router.replace(newUrl, { scroll: false });
  };

  // Unified filter change handler: updates state and URL
  const handleFilterChange = (setter: any, key: string) => (value: any) => {
    setter(value);
    setCurrentPage(1);

    // Build new params based on the new value (use the new value, not current state)
    const params = new URLSearchParams();
    if ((key === 'type' && value) || (key !== 'type' && type))
      params.set('type', key === 'type' ? value : type);
    if ((key === 'condition' && value) || (key !== 'condition' && condition))
      params.set('condition', key === 'condition' ? value : condition);
    if ((key === 'make' && value) || (key !== 'make' && make))
      params.set('make', key === 'make' ? value : make);
    if ((key === 'model' && value) || (key !== 'model' && model))
      params.set('model', key === 'model' ? value : model);
    if (search?.trim()) params.set('search', search.trim());
    if (key === 'sort' ? value !== 'default' : sort !== 'default')
      params.set('sort', key === 'sort' ? value : sort);
    if ((key === 'minPrice' && value) || (key !== 'minPrice' && minPrice))
      params.set('minPrice', key === 'minPrice' ? value : minPrice);
    if ((key === 'maxPrice' && value) || (key !== 'maxPrice' && maxPrice))
      params.set('maxPrice', key === 'maxPrice' ? value : maxPrice);
    const newUrl = params.toString() ? `?${params.toString()}` : '/inventory';
    router.replace(newUrl, { scroll: false });
  };

  const handleRemoveFilter = (key: string) => {
    let newType = type;
    let newCondition = condition;
    let newMake = make;
    let newModel = model;
    let newMinPrice = minPrice;
    let newMaxPrice = maxPrice;
    switch (key) {
      case 'type':
        newType = '';
        setType('');
        break;
      case 'condition':
        newCondition = '';
        setCondition('');
        break;
      case 'make':
        newMake = '';
        setMake('');
        break;
      case 'model':
        newModel = '';
        setModel('');
        break;
      case 'minPrice':
        newMinPrice = '';
        setMinPrice('');
        break;
      case 'maxPrice':
        newMaxPrice = '';
        setMaxPrice('');
        break;
    }
    setCurrentPage(1);
    // Update the URL to reflect the new state
    const params = new URLSearchParams();
    if (search?.trim()) params.set('search', search.trim());
    if (newType) params.set('type', newType);
    if (newCondition) params.set('condition', newCondition);
    if (newMake) params.set('make', newMake);
    if (newModel) params.set('model', newModel);
    if (newMinPrice) params.set('minPrice', newMinPrice);
    if (newMaxPrice) params.set('maxPrice', newMaxPrice);
    if (sort !== 'default') params.set('sort', sort);

    const newUrl = params.toString() ? `?${params.toString()}` : '/inventory';
    router.replace(newUrl, { scroll: false });
  };

  const activeFilters = {
    type,
    condition,
    make,
    model,
    minPrice,
    maxPrice,
  };

  // Sync state from URL when searchParams change (e.g., navigation from header)
  useEffect(() => {
    const urlType = searchParams.get('type') || '';
    const urlCondition = searchParams.get('condition') || '';
    const urlMake = searchParams.get('make') || '';
    const urlModel = searchParams.get('model') || '';
    const urlSearch = searchParams.get('search') || '';
    const urlSort = searchParams.get('sort') || 'default';
    const urlMinPrice = searchParams.get('minPrice') || '';
    const urlMaxPrice = searchParams.get('maxPrice') || '';
    const urlPage = Number(searchParams.get('page')) || 1;

    if (urlType !== type) setType(urlType);
    if (urlCondition !== condition) setCondition(urlCondition);
    if (urlMake !== make) setMake(urlMake);
    if (urlModel !== model) setModel(urlModel);
    if (urlSearch !== search) setSearch(urlSearch);
    if (urlSort !== sort) setSort(urlSort);
    if (urlMinPrice !== minPrice) setMinPrice(urlMinPrice);
    if (urlMaxPrice !== maxPrice) setMaxPrice(urlMaxPrice);
    if (urlPage !== currentPage) setCurrentPage(urlPage);
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8fb] to-[#e6f2ed]">
      <div
        className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8"
        ref={listTopRef}
      >
        <div className="mb-8">
          <SearchSortBar
            search={search}
            setSearch={handleFilterChange(setSearch, 'search')}
            sort={sort}
            setSort={handleFilterChange(setSort, 'sort')}
            resultCount={filteredVehicles.length}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <button
            className="lg:hidden flex items-center justify-center gap-2 bg-white text-green-700 rounded-lg p-3 shadow-sm hover:bg-green-50 transition-colors"
            onClick={() => setShowMobileFilters(true)}
          >
            <FaFilter className="w-5 h-5" />
            <span>Filters</span>
          </button>

          {/* Mobile filter tags below Filters button */}
          <div className="lg:hidden ">
            <FilterTags filters={activeFilters} onRemove={handleRemoveFilter} />
          </div>

          {showMobileFilters && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-xl w-[90vw] max-w-sm relative animate-fadeInUp">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-3"
                  onClick={() => setShowMobileFilters(false)}
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="mb-4 mt-2">
                  <Filters
                    type={type}
                    setType={handleFilterChange(setType, 'type')}
                    condition={condition}
                    setCondition={handleFilterChange(setCondition, 'condition')}
                    make={make}
                    setMake={handleFilterChange(setMake, 'make')}
                    model={model}
                    setModel={handleFilterChange(setModel, 'model')}
                    minPrice={minPrice}
                    setMinPrice={handleFilterChange(setMinPrice, 'minPrice')}
                    maxPrice={maxPrice}
                    setMaxPrice={handleFilterChange(setMaxPrice, 'maxPrice')}
                    types={types}
                    conditions={conditions}
                    makes={makes}
                    models={models}
                    filters={activeFilters}
                    onRemove={handleRemoveFilter}
                    onBatchUpdate={handleBatchFilterChange}
                  />
                </div>
              </div>
            </div>
          )}

          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8">
              <Filters
                type={type}
                setType={handleFilterChange(setType, 'type')}
                condition={condition}
                setCondition={handleFilterChange(setCondition, 'condition')}
                make={make}
                setMake={handleFilterChange(setMake, 'make')}
                model={model}
                setModel={handleFilterChange(setModel, 'model')}
                minPrice={minPrice}
                setMinPrice={handleFilterChange(setMinPrice, 'minPrice')}
                maxPrice={maxPrice}
                setMaxPrice={handleFilterChange(setMaxPrice, 'maxPrice')}
                types={types}
                conditions={conditions}
                makes={makes}
                models={models}
                filters={activeFilters}
                onRemove={handleRemoveFilter}
                onBatchUpdate={handleBatchFilterChange}
              />
            </div>
          </aside>

          <main className="flex-1">
            {paginatedVehicles.length > 0 ? (
              <>
                <div />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <FaTools className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  No Equipment Found
                </h3>
                <p className="text-gray-600 max-w-md mb-6">
                  {search || type || condition || make || model ? (
                    <>
                      We couldn&rsquo;t find any equipment matching your search
                      criteria. Try adjusting your filters or search terms.
                    </>
                  ) : (
                    <>
                      No equipment is currently available in our inventory.
                      Please check back later for new listings.
                    </>
                  )}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
