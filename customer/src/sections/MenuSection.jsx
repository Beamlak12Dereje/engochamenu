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
    <section id="menu" className="min-h-screen pt-2 bg-brand-purple/95 relative">
      {/* Item Count Text */}
      <div className="container mx-auto max-w-7xl px-4 mb-3">
        <h2 className="text-white text-sm md:text-base font-normal text-center">
          {totalItems} delicious items available
        </h2>
      </div>

      {/* Sticky Floating Filter Button - only visible in menu section */}
      <button 
        className="sticky top-24 float-right mr-4 md:mr-8 z-40 flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-brand-yellow/90 transition-colors border border-white/30 bg-transparent text-brand-yellow font-normal shadow-lg mb-4"
        onClick={() => setFilterOpen(!filterOpen)}
      >
        <Filter size={16} />
        <span className="text-xs">▼</span>
      </button>

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

            {/* Content */}
            <div className="p-4">
              {/* All Categories Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-base font-bold text-white">All Categories</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      window.location.hash = 'menu';
                      setFilterOpen(false);
                    }}
                    className="px-4 py-2 rounded-full font-semibold text-sm hover:opacity-80 transition-colors"
                    style={{ backgroundColor: '#FFF9E6', color: '#212E50' }}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => scrollToCategory(category.name)}
                      className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 transition-colors capitalize"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Items Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-base font-bold text-white">Popular Items</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {itemsByCategory
                    .flatMap(cat => cat.items)
                    .filter(item => item.is_popular)
                    .map((item) => (
                      <button
                        key={`popular-${item.id}`}
                        onClick={() => {
                          const categoryName = categories.find(cat => cat.id === item.category_id)?.name;
                          if (categoryName) scrollToCategory(categoryName);
                        }}
                        className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 transition-colors capitalize"
                      >
                        {item.name}
                      </button>
                    ))}
                  {itemsByCategory.flatMap(cat => cat.items).filter(item => item.is_popular).length === 0 && (
                    <p className="text-white/60 text-sm">No popular items yet</p>
                  )}
                </div>
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
            {/* All Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white/70 mb-4">All Categories</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => window.location.hash = 'menu'}
                  className="px-6 py-2.5 rounded-full text-brand-purple font-semibold text-sm hover:opacity-80 transition-colors"
                  style={{ backgroundColor: '#FFF9E6' }}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.name)}
                    className="px-6 py-2.5 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 transition-colors capitalize"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Items */}
            <div>
              <h3 className="text-lg font-semibold text-white/70 mb-4">Popular Items</h3>
              <div className="flex flex-wrap gap-3">
                {itemsByCategory
                  .flatMap(cat => cat.items)
                  .filter(item => item.is_popular)
                  .map((item) => (
                    <button
                      key={`bottom-popular-${item.id}`}
                      onClick={() => {
                        const categoryName = categories.find(cat => cat.id === item.category_id)?.name;
                        if (categoryName) scrollToCategory(categoryName);
                      }}
                      className="px-6 py-2.5 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 transition-colors capitalize"
                    >
                      {item.name}
                    </button>
                  ))}
                {itemsByCategory.flatMap(cat => cat.items).filter(item => item.is_popular).length === 0 && (
                  <p className="text-white/60 text-sm">No popular items yet</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
