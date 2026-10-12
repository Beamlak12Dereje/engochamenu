import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

const ItemFormModal = ({ isOpen, onClose, onSubmit, item, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_ethiopian: '',
    price_foreigner: '',
    category_id: '',
    image_url: '',
    is_popular: false,
    is_spicy: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price_ethiopian: item.price_ethiopian || item.price_local || '',
        price_foreigner: item.price_foreigner || item.price_foreign || '',
        category_id: item.category_id,
        image_url: item.image_url,
        is_popular: item.is_popular,
        is_spicy: item.is_spicy,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price_ethiopian: '',
        price_foreigner: '',
        category_id: categories[0]?.id || '',
        image_url: '',
        is_popular: false,
        is_spicy: false,
      });
    }
    setErrors({});
  }, [item, isOpen, categories]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.price_ethiopian || formData.price_ethiopian <= 0) {
      newErrors.price_ethiopian = 'Ethiopian price must be a positive number';
    }

    if (!formData.price_foreigner || formData.price_foreigner <= 0) {
      newErrors.price_foreigner = 'Foreigner price must be a positive number';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    try {
      const result = await onSubmit({
        ...formData,
        price_ethiopian: Number(formData.price_ethiopian),
        price_foreigner: Number(formData.price_foreigner),
        category_id: Number(formData.category_id),
      });
      
      if (result.success) {
        onClose();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form error:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? 'Edit Item' : 'Add Item'}
    >
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A809]"
            placeholder="e.g., Doro Wot"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A809]"
            rows="3"
            placeholder="Describe the dish..."
          />
        </div>

        {/* Price and Category */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Ethiopian Price (Birr) *
            </label>
            <input
              type="number"
              value={formData.price_ethiopian}
              onChange={(e) => handleChange('price_ethiopian', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A809]"
              placeholder="350"
              min="0"
              step="0.01"
            />
            {errors.price_ethiopian && (
              <p className="text-red-500 text-sm mt-1">{errors.price_ethiopian}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Foreigner Price (Birr) *
            </label>
            <input
              type="number"
              value={formData.price_foreigner}
              onChange={(e) => handleChange('price_foreigner', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A809]"
              placeholder="500"
              min="0"
              step="0.01"
            />
            {errors.price_foreigner && (
              <p className="text-red-500 text-sm mt-1">{errors.price_foreigner}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Category *
          </label>
          <select
            value={formData.category_id}
            onChange={(e) => handleChange('category_id', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A809]"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Item Image
          </label>
          <div className="flex flex-col gap-4">
            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Create preview URL
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleChange('image_url', reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A809] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-[#212E50] file:font-semibold hover:file:bg-gray-100"
            />
            
            {/* Image Preview */}
            {formData.image_url && (
              <div className="relative">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleChange('image_url', '')}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-2 mb-6 justify-center">
          <button
            type="button"
            onClick={() => handleChange('is_popular', !formData.is_popular)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border-2 transition-colors font-semibold text-xs ${
              formData.is_popular
                ? 'bg-purple-100 border-purple-500 text-purple-800'
                : 'bg-gray-100 border-gray-300 text-gray-600'
            }`}
          >
            <span className="text-sm">⭐</span>
            <span>Popular</span>
          </button>

          <button
            type="button"
            onClick={() => handleChange('is_spicy', !formData.is_spicy)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border-2 transition-colors font-semibold text-xs ${
              formData.is_spicy
                ? 'bg-red-100 border-red-500 text-red-800'
                : 'bg-gray-100 border-gray-300 text-gray-600'
            }`}
          >
            <span className="text-sm">🔥</span>
            <span>Spicy</span>
          </button>
        </div>

        {/* Buttons */}
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
            {item ? 'Update' : 'Add'} Item
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ItemFormModal;
