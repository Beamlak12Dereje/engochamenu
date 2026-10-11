import { useState, useEffect } from 'react';
import * as itemApi from '../api/itemApi';
import { useToast } from '../context/ToastContext';

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await itemApi.getItems();
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load items');
      showToast('Failed to load items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (itemData) => {
    try {
      const response = await itemApi.createItem(itemData);
      setItems([...items, response.data]);
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
      setItems(items.map(item => item.id === id ? response.data : item));
      showToast('Item updated successfully', 'success');
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update item', 'error');
      return { success: false };
    }
  };

  const removeItem = async (id) => {
    try {
      await itemApi.deleteItem(id);
      setItems(items.filter(item => item.id !== id));
      showToast('Item deleted successfully', 'success');
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete item', 'error');
      return { success: false };
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    reload: loadItems,
  };
};
