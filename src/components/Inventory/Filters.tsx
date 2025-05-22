import React, { useMemo } from 'react';
import vehicleData from '@/data/vehicleData.json';
import FilterTags from './FilterTags';

const Filters = ({
  type,
  setType,
  condition,
  setCondition,
  make,
  setMake,
  model,
  setModel,
  types,
  conditions,
  makes,
  models,
  filters,
  onRemove,
}: any) => {
  // Get filtered options based on current selections
  const filteredConditions = useMemo(() => {
    if (!type) return conditions;
    return conditions.filter((c: string) =>
      vehicleData.some((v: any) => v.type === type && v.condition === c),
    );
  }, [type, conditions]);

  const filteredMakes = useMemo(() => {
    if (!type && !condition) return makes;
    return makes.filter((m: string) =>
      vehicleData.some(
        (v: any) =>
          (!type || v.type === type) &&
          (!condition || v.condition === condition) &&
          v.make === m,
      ),
    );
  }, [type, condition, makes]);

  const filteredModels = useMemo(() => {
    if (!type && !condition && !make) return models;
    return models.filter((m: string) =>
      vehicleData.some(
        (v: any) =>
          (!type || v.type === type) &&
          (!condition || v.condition === condition) &&
          (!make || v.make === make) &&
          v.model === m,
      ),
    );
  }, [type, condition, make, models]);

  // Reset dependent filters when parent filter changes
  const handleTypeChange = (value: string) => {
    setType(value);
    setCondition('');
    setMake('');
    setModel('');
  };

  const handleConditionChange = (value: string) => {
    setCondition(value);
    setMake('');
    setModel('');
  };

  const handleMakeChange = (value: string) => {
    setMake(value);
    setModel('');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Filter tags at the top */}
      {filters && onRemove && (
        <FilterTags filters={filters} onRemove={onRemove} className="mb-4" />
      )}
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Types</option>
            {types.map((t: string) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Condition
          </label>
          <select
            value={condition}
            onChange={(e) => handleConditionChange(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200"
            disabled={filteredConditions.length === 0}
          >
            <option value="">All Conditions</option>
            {filteredConditions.map((c: string) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Make
          </label>
          <select
            value={make}
            onChange={(e) => handleMakeChange(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200"
            disabled={filteredMakes.length === 0}
          >
            <option value="">All Makes</option>
            {filteredMakes.map((m: string) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200"
            disabled={filteredModels.length === 0}
          >
            <option value="">All Models</option>
            {filteredModels.map((m: string) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
