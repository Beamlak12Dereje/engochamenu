import React, { useState, useMemo } from 'react';
import { useItems } from '../hooks/useItems';
import { useCategories } from '../hooks/useCategories';
import ItemsTable from '../components/items/ItemsTable';
import ItemFormModal from '../components/items/ItemFormModal';
import ItemFilters from '../components/items/ItemFilters';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';

const ItemsPage = () => {
  const { items, loading: itemsLoading, addItem, updateItem, removeItem } = useItems();
  const { categories, loading: categoriesLoading } = useCategories();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !categoryFilter || item.category_id === Number(categoryFilter);
      return matchesSearch && matchesCategory;
    });
  }, [items, search, categoryFilter]);

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (itemData) => {
    if (editingItem) {
      return await updateItem(editingItem.id, itemData);
    } else {
      return await addItem(itemData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleTogglePopular = async (id, isPopular) => {
    await updateItem(id, { is_popular: isPopular });
  };

  const handleToggleSpicy = async (id, isSpicy) => {
    await updateItem(id, { is_spicy: isSpicy });
  };

  if (itemsLoading || categoriesLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Menu Items</h1>
          <p className="text-white/80 mt-1">
            {filteredItems.length} of {items.length} items
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-white text-[#212E50] rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 font-semibold"
        >
          <span className="text-xl">+</span>
          Add Item
        </button>
      </div>

      {/* Filters */}
      <ItemFilters
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      {/* Content */}
      {filteredItems.length === 0 ? (
        <EmptyState
          message={
            items.length === 0
              ? 'No items yet. Add your first menu item to get started.'
              : 'No items match your filters.'
          }
          actionLabel={items.length === 0 ? 'Add Item' : undefined}
          onAction={items.length === 0 ? () => setIsModalOpen(true) : undefined}
        />
      ) : (
        <ItemsTable
          items={filteredItems}
          categories={categories}
          onEdit={handleEdit}
          onDelete={removeItem}
          onTogglePopular={handleTogglePopular}
          onToggleSpicy={handleToggleSpicy}
        />
      )}

      {/* Modal */}
      <ItemFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        item={editingItem}
        categories={categories}
      />
    </div>
  );
};

export default ItemsPage;
