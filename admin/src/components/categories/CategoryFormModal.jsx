import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import ConfirmDialog from '../common/ConfirmDialog';

const CategoryFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  category, 
  categories = [], 
  items = [], 
  onDelete 
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName('');
    }
    setError('');
    setIsDeleting(false);
    setShowDeleteConfirm(false);
  }, [category, isOpen]);

  // Check how many items belong to this category
  const itemCount = category 
    ? items.filter(i => i.category_id === category.id).length 
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Name is required');
      return;
    }

    // Check for duplicate category name (case-insensitive)
    const isDuplicate = categories.some(existingCat => {
      if (category && existingCat.id === category.id) return false;
      return existingCat.name?.trim().toLowerCase() === trimmedName.toLowerCase();
    });

    if (isDuplicate) {
      setError('A category with this name already exists');
      return;
    }

    const result = await onSubmit({ name: trimmedName });
    
    if (result.success) {
      setName('');
      setError('');
      onClose();
    }
  };

  const handleDeleteClick = () => {
    if (itemCount > 0) {
      setError(`Cannot delete this category. It still has ${itemCount} item(s). Please move or delete the items first.`);
      return;
    }
    setError('');
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!category || !onDelete) return;
    try {
      setIsDeleting(true);
      const result = await onDelete(category.id);
      if (result?.success !== false) {
        setShowDeleteConfirm(false);
        onClose();
      }
    } catch (err) {
      console.error('Delete category error:', err);
      setError(err.message || 'Failed to delete category');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? 'Edit Category' : 'Add Category'}
      closeOnBackdrop={false}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Category Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A809]"
            placeholder="e.g., Traditional Dishes"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Buttons in order: Edit/Update, Cancel, Delete */}
        <div className="flex flex-wrap gap-3 justify-end items-center mt-6">
          {/* 1. Edit / Update Category (or Add Category) */}
          <button
            type="submit"
            disabled={isDeleting}
            className="px-4 py-2 bg-white text-[#212E50] rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-sm disabled:opacity-50"
          >
            {category ? 'Update' : 'Add'} Category
          </button>

          {/* 2. Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-sm disabled:opacity-50"
          >
            Cancel
          </button>

          {/* 3. Delete Button (shown when editing category) */}
          {category && onDelete && (
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteClick}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-sm disabled:opacity-50 flex items-center gap-1.5"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      </form>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${category?.name}"? This action cannot be undone.`}
      />
    </Modal>
  );
};

export default CategoryFormModal;
