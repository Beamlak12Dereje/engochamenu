import { useState, useEffect, useMemo } from 'react';
import { getCategories, getItems, getFeaturedMenuItems } from '../api/menuApi';
import { getCategoryName } from '../data/mockMenu';

/**
 * Custom hook to manage menu data, search, and filtering
 * Shared between HomeSection (search) and MenuSection (filter)
 */
export const useMenu = () => {
  // Data state
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and search state
  const [searchText, setSearchText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // null = "All"

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load all data in parallel
        const [categoriesData, itemsData, featuredData] = await Promise.all([
          getCategories(),
          getItems(),
          getFeaturedMenuItems(),
        ]);
        
        setCategories(categoriesData);
        setItems(itemsData);
        setFeaturedItems(featuredData);
      } catch (err) {
        setError(err.message || 'Failed to load menu data');
        console.error('Error loading menu:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter and search items
  const filteredItems = useMemo(() => {
    let result = items;

    // Filter by category
    if (selectedCategoryId !== null) {
      result = result.filter(item => item.category_id === selectedCategoryId);
    }

    // Filter by search text
    if (searchText.trim() !== '') {
      const search = searchText.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      );
    }

    return result;
  }, [items, selectedCategoryId, searchText]);

  // Group filtered items by category for display
  const itemsByCategory = useMemo(() => {
    const grouped = {};
    
    filteredItems.forEach(item => {
      if (!grouped[item.category_id]) {
        grouped[item.category_id] = {
          categoryId: item.category_id,
          categoryName: getCategoryName(item.category_id),
          items: [],
        };
      }
      grouped[item.category_id].items.push(item);
    });
    
    return Object.values(grouped);
  }, [filteredItems]);

  // Handle search - sets search text and scrolls to menu
  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() !== '') {
      // Scroll to menu section
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle category filter change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchText('');
    setSelectedCategoryId(null);
  };

  return {
    // Data
    categories,
    items,
    featuredItems,
    filteredItems,
    itemsByCategory,
    
    // UI state
    loading,
    error,
    
    // Filter state
    searchText,
    selectedCategoryId,
    
    // Actions
    handleSearch,
    handleCategoryChange,
    clearFilters,
  };
};
