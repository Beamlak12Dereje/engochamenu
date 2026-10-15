import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import ConfirmDialog from '../common/ConfirmDialog';
import { uploadItemImage } from '../../api/itemApi';

const ItemFormModal = ({ isOpen, onClose, onSubmit, item, categories, items = [], onDelete }) => {
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
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price_ethiopian: item.price_ethiopian || item.price_local || '',
        price_foreigner: item.price_foreigner || item.price_foreign || '',
        category_id: item.category_id || categories[0]?.id || '',
        image_url: item.image_url || '',
        is_popular: Boolean(item.is_popular),
        is_spicy: Boolean(item.is_spicy),
      });
      setPreviewUrl(item.image_url || '');
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
      setPreviewUrl('');
    }
    setImageFile(null);
    setIsUploading(false);
    setErrors({});
  }, [item, isOpen]);

  // If categories load after modal opened, fill default category without resetting other fields
  useEffect(() => {
    if (isOpen && !item && categories.length > 0) {
      setFormData(prev => {
        if (!prev.category_id) {
          return { ...prev, category_id: categories[0].id };
        }
        return prev;
      });
    }
  }, [isOpen, item, categories.length]);

  const validate = () => {
    const newErrors = {};
    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      newErrors.name = 'Name is required';
    } else {
      const isDuplicate = items.some(existingItem => {
        if (item && existingItem.id === item.id) return false;
        return existingItem.name?.trim().toLowerCase() === trimmedName.toLowerCase();
      });

      if (isDuplicate) {
        newErrors.name = 'An item with this name already exists';
      }
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
      setIsUploading(true);
      let finalImageUrl = formData.image_url;

      // If user selected a new file, upload to Supabase Storage bucket
      if (imageFile) {
        finalImageUrl = await uploadItemImage(imageFile);
      } else if (!previewUrl) {
        // Image was cleared by user
        finalImageUrl = null;
      }

      const result = await onSubmit({
        ...formData,
        price_ethiopian: Number(formData.price_ethiopian),
        price_foreigner: Number(formData.price_foreigner),
        category_id: Number(formData.category_id),
        image_url: finalImageUrl,
      });
      
      if (result.success) {
        onClose();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to upload image. Please verify the "menu-images" storage bucket exists and is public in Supabase.'
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!item || !onDelete) return;
    try {
      setIsDeleting(true);
      const result = await onDelete(item.id);
      if (result?.success !== false) {
        setShowDeleteConfirm(false);
        onClose();
      }
    } catch (err) {
      console.error('Delete error:', err);
      setErrors(prev => ({
        ...prev,
        submit: err.message || 'Failed to delete item.'
      }));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl('');
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? 'Edit Item' : 'Add Item'}
      closeOnBackdrop={false}
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
              disabled={isUploading}
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A809] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-[#212E50] file:font-semibold hover:file:bg-gray-100 disabled:opacity-50"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
            
            {/* Image Preview */}
            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-md disabled:opacity-50"
                  title="Remove image"
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
            disabled={isUploading}
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
            disabled={isUploading}
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

        {/* Submit Error Message */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {errors.submit}
          </div>
        )}

        {/* Buttons in order: Edit/Update, Cancel, Delete */}
        <div className="flex flex-wrap gap-3 justify-end items-center">
          {/* 1. Edit / Update Item (or Add Item) */}
          <button
            type="submit"
            disabled={isUploading || isDeleting}
            className="px-4 py-2 bg-white text-[#212E50] rounded-lg hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50 flex items-center gap-2 shadow-sm"
          >
            {isUploading ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                <span>{imageFile ? 'Uploading Image...' : 'Saving...'}</span>
              </>
            ) : (
              `${item ? 'Update' : 'Add'} Item`
            )}
          </button>

          {/* 2. Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading || isDeleting}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50 shadow-sm"
          >
            Cancel
          </button>

          {/* 3. Delete Button (shown when editing item) */}
          {item && onDelete && (
            <button
              type="button"
              disabled={isUploading || isDeleting}
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
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
        onConfirm={handleDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${item?.name}"? This action cannot be undone.`}
      />
    </Modal>
  );
};

export default ItemFormModal;
