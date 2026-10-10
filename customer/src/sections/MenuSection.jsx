import React, { useState } from 'react';
import FilterDropdown from '../components/menu/FilterDropdown';
import CategorySection from '../components/menu/CategorySection';
import Loader from '../components/common/Loader';
import { Filter, X } from 'lucide-react';

const MenuSection = ({ 
  categories, 
  itemsByCategory, 
  selectedCategoryId, 
  onCategoryChange,
  loading,
  error,
  searchText 
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Calculate total items
  const totalItems = itemsByCategory.reduce((sum, cat) => sum + cat.items.length, 0);

  const scrollToCategory = (categoryName) => {
    const element = document.getElementById(`category-${categoryName}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setFilterOpen(false);
    }
  };

  return (
    <section id="menu" className="min-h-screen py-0 bg-brand-purple">
      {/* Sticky Header with count and filter */}
      <div className="sticky top-[72.93px] z-40 bg-brand-purple text-white py-6 px-4 border-b border-white/10">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-semibold">
            {totalItems} delicious items available
          </h2>
          <button 
            className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors"
            style={{ border: '1px solid #FFF9E6' }}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={18} />
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Dropdown Menu */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setFilterOpen(false)}>
          <div 
            className="absolute top-[72.93px] right-4 bg-brand-purple border-2 border-brand-yellow rounded-2xl shadow-xl w-80 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-brand-purple border-b border-brand-yellow/30 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Filter Menu</h3>
              <button 
                onClick={() => setFilterOpen(false)}
                className="text-white hover:text-brand-yellow transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Categories List */}
            <div className="p-4">
              <h4 className="text-sm font-semibold text-white/70 mb-3">Collections</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => {
                    window.location.hash = 'menu';
                    setFilterOpen(false);
                  }}
                  className="px-4 py-2 rounded-full text-brand-purple font-semibold text-sm hover:opacity-80 transition-colors"
                  style={{ backgroundColor: '#FFF9E6' }}
                >
                  📋 All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.name)}
                    className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Loading State */}
        {loading && <Loader />}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 font-semibold text-lg mb-4">
              ⚠️ {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-white text-brand-purple px-6 py-2 rounded-full font-semibold hover:bg-brand-yellow transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && itemsByCategory.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/80 text-lg font-semibold">
              {searchText ? `No items found for "${searchText}"` : 'No items available'}
            </p>
          </div>
        )}

        {/* Menu Items by Category */}
        {!loading && !error && itemsByCategory.map((categoryGroup) => (
          <CategorySection 
            key={categoryGroup.categoryId}
            categoryName={categoryGroup.categoryName}
            items={categoryGroup.items}
          />
        ))}

        {/* Collections/Categories Filter Section at Bottom */}
        {!loading && !error && categories.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/20">
            {/* Collections */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white/70 mb-4">📋 All Collections</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => window.location.hash = 'menu'}
                  className="px-6 py-2.5 rounded-full text-brand-purple font-semibold text-sm hover:opacity-80 transition-colors"
                  style={{ backgroundColor: '#FFF9E6' }}
                >
                  📋 All Collections
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.name)}
                    className="px-6 py-2.5 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories (All Items) */}
            <div>
              <h3 className="text-lg font-semibold text-white/70 mb-4">📂 All Items</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => window.location.hash = 'menu'}
                  className="px-6 py-2.5 rounded-full text-brand-purple font-semibold text-sm hover:opacity-80 transition-colors"
                  style={{ backgroundColor: '#FFF9E6' }}
                >
                  📂 All Items
                </button>
                {categories.map((category) => (
                  <button
                    key={`cat-${category.id}`}
                    onClick={() => scrollToCategory(category.name)}
                    className="px-6 py-2.5 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
