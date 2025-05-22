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

const PAGE_SIZE = 10;

export default function InventoryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [type, setType] = useState(searchParams.get('type') || '');
  const [condition, setCondition] = useState(
    searchParams.get('condition') || '',
  );
  const [make, setMake] = useState(searchParams.get('make') || '');
  const [model, setModel] = useState(searchParams.get('model') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'default');
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
    if (sort === 'price-asc')
      filtered = [...filtered].sort(
        (a, b) =>
          parseInt(a.price.replace(/[^0-9]/g, '')) -
          parseInt(b.price.replace(/[^0-9]/g, '')),
      );
    if (sort === 'price-desc')
      filtered = [...filtered].sort(
        (a, b) =>
          parseInt(b.price.replace(/[^0-9]/g, '')) -
          parseInt(a.price.replace(/[^0-9]/g, '')),
      );
    if (sort === 'title-asc')
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'title-desc')
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    return filtered;
  }, [type, condition, make, model, search, sort]);

  const totalPages = Math.ceil(filteredVehicles.length / PAGE_SIZE);
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredVehicles.slice(start, start + PAGE_SIZE);
  }, [filteredVehicles, currentPage]);

  const handleFilterChange = (setter: any) => (value: any) => {
    if (setter === setSearch) {
      const trimmedValue = value.trim();
      setter(trimmedValue);
    } else {
      setter(value);
    }
    setCurrentPage(1);
  };

  const handleRemoveFilter = (key: string) => {
    switch (key) {
      case 'type':
        setType('');
        break;
      case 'condition':
        setCondition('');
        break;
      case 'make':
        setMake('');
        break;
      case 'model':
        setModel('');
        break;
    }
  };

  const activeFilters = {
    type,
    condition,
    make,
    model,
  };

  useEffect(() => {
    const params = new URLSearchParams();
    let hasParams = false;

    // Add parameters only if they have values
    if (search?.trim()) {
      params.set('search', search.trim());
      hasParams = true;
    }
    if (type) {
      params.set('type', type);
      hasParams = true;
    }
    if (condition) {
      params.set('condition', condition);
      hasParams = true;
    }
    if (make) {
      params.set('make', make);
      hasParams = true;
    }
    if (model) {
      params.set('model', model);
      hasParams = true;
    }
    if (sort !== 'default') {
      params.set('sort', sort);
      hasParams = true;
    }
    if (currentPage > 1) {
      params.set('page', currentPage.toString());
      hasParams = true;
    }

    // If we have any parameters, use them, otherwise use the base path
    const newUrl = hasParams ? `?${params.toString()}` : '/inventory';
    router.replace(newUrl, { scroll: false });
  }, [search, type, condition, make, model, sort, currentPage, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8fb] to-[#e6f2ed]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <SearchSortBar
            search={search}
            setSearch={handleFilterChange(setSearch)}
            sort={sort}
            setSort={handleFilterChange(setSort)}
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
                    setType={handleFilterChange(setType)}
                    condition={condition}
                    setCondition={handleFilterChange(setCondition)}
                    make={make}
                    setMake={handleFilterChange(setMake)}
                    model={model}
                    setModel={handleFilterChange(setModel)}
                    types={types}
                    conditions={conditions}
                    makes={makes}
                    models={models}
                    filters={activeFilters}
                    onRemove={handleRemoveFilter}
                  />
                </div>
              </div>
            </div>
          )}

          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8">
              <Filters
                type={type}
                setType={handleFilterChange(setType)}
                condition={condition}
                setCondition={handleFilterChange(setCondition)}
                make={make}
                setMake={handleFilterChange(setMake)}
                model={model}
                setModel={handleFilterChange(setModel)}
                types={types}
                conditions={conditions}
                makes={makes}
                models={models}
                filters={activeFilters}
                onRemove={handleRemoveFilter}
              />
            </div>
          </aside>

          <main className="flex-1">
            {paginatedVehicles.length > 0 ? (
              <>
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
                      onPageChange={setCurrentPage}
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
