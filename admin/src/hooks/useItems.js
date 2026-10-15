import { useState } from 'react';
import * as itemApi from '../api/itemApi';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';

export const useItems = () => {
  const { items: cachedItems, setItems: setCachedItems, loading: globalLoading } = useData();
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const addItem = async (itemData) => {
    try {
      const response = await itemApi.createItem(itemData);
      setCachedItems([...cachedItems, response.data]);
      showToast('Item added successfully', 'success');
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add item', 'error');
      return { success: false };
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      const response = await itemApi.updateItem(id, itemData);
      // Update cached items with the response data
      setCachedItems(cachedItems.map(item => item.id === id ? response.data : item));
      showToast('Item updated successfully', 'success');
      return { success: true };
    } catch (err) {
      console.error('Update error:', err);
      showToast(err.message || 'Failed to update item', 'error');
      return { success: false };
    }
  };

  const removeItem = async (id) => {
    try {
      const itemToDelete = cachedItems.find(item => item.id === id);
      await itemApi.deleteItem(id, itemToDelete?.image_url);
      setCachedItems(cachedItems.filter(item => item.id !== id));
      showToast('Item deleted successfully', 'success');
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || err.message || 'Failed to delete item', 'error');
      return { success: false };
    }
  };

  return {
    items: cachedItems,
    loading: globalLoading,
    error,
    addItem,
    updateItem,
    removeItem,
  };
};
