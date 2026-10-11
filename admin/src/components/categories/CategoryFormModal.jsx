import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

const CategoryFormModal = ({ isOpen, onClose, onSubmit, category }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName('');
    }
    setError('');
  }, [category, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    const result = await onSubmit({ name: name.trim() });
    
    if (result.success) {
      setName('');
      setError('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? 'Edit Category' : 'Add Category'}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Category Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A809]"
            placeholder="e.g., Traditional Dishes"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-white text-[#212E50] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            {category ? 'Update' : 'Add'} Category
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryFormModal;
