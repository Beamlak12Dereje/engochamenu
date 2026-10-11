import React, { useState, useMemo } from 'react';
import { useCategories } from '../hooks/useCategories';
import { useItems } from '../hooks/useItems';
import CategoryList from '../components/categories/CategoryList';
import CategoryFormModal from '../components/categories/CategoryFormModal';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';

const CategoriesPage = () => {
  const { categories, loading: categoriesLoading, addCategory, updateCategory, removeCategory } = useCategories();
  const { items, loading: itemsLoading } = useItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [search, setSearch] = useState('');

  // Filter categories by search
  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = async (categoryData) => {
    if (editingCategory) {
      return await updateCategory(editingCategory.id, categoryData);
    } else {
      return await addCategory(categoryData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  if (categoriesLoading || itemsLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Categories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-white text-[#212E50] rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 font-semibold"
        >
          <span className="text-xl">+</span>
          Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow p-4 mb-6 border border-white/20 max-w-md">
        <div className="relative">
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by category name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A809]"
          />
        </div>
      </div>

      {/* Content */}
      {filteredCategories.length === 0 ? (
        <EmptyState
          message={
            categories.length === 0
              ? 'No categories yet. Add your first category to get started.'
              : 'No categories match your search.'
          }
          actionLabel={categories.length === 0 ? 'Add Category' : undefined}
          onAction={categories.length === 0 ? () => setIsModalOpen(true) : undefined}
        />
      ) : (
        <CategoryList
          categories={filteredCategories}
          items={items}
          onEdit={handleEdit}
          onDelete={removeCategory}
        />
      )}

      {/* Modal */}
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        category={editingCategory}
      />
    </div>
  );
};

export default CategoriesPage;
