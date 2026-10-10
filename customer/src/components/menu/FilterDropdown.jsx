import React from 'react';
import { Filter } from 'lucide-react';

const FilterDropdown = ({ categories, selectedCategoryId, onCategoryChange }) => {
  return (
    <div className="mb-8 flex justify-start">
      <div className="relative inline-block">
        <label htmlFor="category-filter" className="sr-only">
          Filter by category
        </label>
        <div className="flex items-center gap-2 bg-white border-2 border-brand-blue/20 rounded-full px-4 py-2.5 shadow-md hover:border-brand-purple/40 transition-colors">
          <Filter size={18} className="text-brand-purple" />
          <select
            id="category-filter"
            value={selectedCategoryId || ''}
            onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
            className="bg-transparent text-brand-blue font-semibold text-sm md:text-base focus:outline-none cursor-pointer pr-2"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
