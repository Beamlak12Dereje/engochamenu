import { useState, useEffect } from 'react';
import * as categoryApi from '../api/categoryApi';
import { useToast } from '../context/ToastContext';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryApi.getCategories();
      setCategories(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load categories');
      showToast('Failed to load categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const response = await categoryApi.createCategory(categoryData);
      setCategories([...categories, response.data]);
      showToast('Category added successfully', 'success');
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add category', 'error');
      return { success: false };
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const response = await categoryApi.updateCategory(id, categoryData);
      setCategories(categories.map(cat => cat.id === id ? response.data : cat));
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
      setCategories(categories.filter(cat => cat.id !== id));
      showToast('Category deleted successfully', 'success');
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete category', 'error');
      return { success: false };
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    removeCategory,
    reload: loadCategories,
  };
};
