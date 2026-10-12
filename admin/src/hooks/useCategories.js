import { useState, useEffect } from 'react';
import * as categoryApi from '../api/categoryApi';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';

export const useCategories = () => {
  const { categories: cachedCategories, setCategories: setCachedCategories, loading: globalLoading } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const addCategory = async (categoryData) => {
    try {
      const response = await categoryApi.createCategory(categoryData);
      setCachedCategories([...cachedCategories, response.data]);
      showToast('Category added successfully', 'success');
      return { success: true };
    } catch (err) {
      console.error('Category add error:', err);
      const errorMessage = err.message || err.response?.data?.message || 'Failed to add category';
      showToast(errorMessage, 'error');
      return { success: false };
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const response = await categoryApi.updateCategory(id, categoryData);
      setCachedCategories(cachedCategories.map(cat => cat.id === id ? response.data : cat));
      showToast('Category updated successfully', 'success');
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update category', 'error');
      return { success: false };
    }
  };

  const removeCategory = async (id) => {
    try {
      await categoryApi.deleteCategory(id);
      setCachedCategories(cachedCategories.filter(cat => cat.id !== id));
      showToast('Category deleted successfully', 'success');
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete category', 'error');
      return { success: false };
    }
  };

  return {
    categories: cachedCategories,
    loading: globalLoading,
    error,
    addCategory,
    updateCategory,
    removeCategory,
  };
};
