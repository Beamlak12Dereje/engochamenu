import React, { createContext, useContext, useState, useEffect } from 'react';
import * as categoryApi from '../api/categoryApi';
import * as itemApi from '../api/itemApi';
import { getSuggestions } from '../api/suggestionApi';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all data once on app startup
  const loadAllData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      
      const [categoriesRes, itemsRes, suggestionsRes] = await Promise.all([
        categoryApi.getCategories(),
        itemApi.getItems(),
        getSuggestions(),
      ]);
      
      setCategories(categoriesRes.data);
      setItems(itemsRes.data);
      setSuggestions(suggestionsRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
    
    // Auto-refresh every 30 seconds (silent)
    const interval = setInterval(() => {
      loadAllData(true);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider 
      value={{ 
        categories, 
        setCategories,
        items, 
        setItems,
        suggestions,
        setSuggestions,
        loading,
        refresh: loadAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
