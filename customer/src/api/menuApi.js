import { supabase } from '../lib/supabase';

/**
 * Get all categories
 * @returns {Promise<Array>} Array of category objects
 */
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

/**
 * Get all menu items
 * @param {number} categoryId - Optional category filter
 * @returns {Promise<Array>} Array of menu item objects
 */
export const getItems = async (categoryId = null) => {
  let query = supabase
    .from('menu_items')
    .select('*')
    .order('name');
  
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  // Convert database format to frontend format
  return data.map(item => ({
    ...item,
    price_ethiopian: item.price_local,
    price_foreigner: item.price_foreign
  }));
};

/**
 * Get featured items for the home slider
 * @returns {Promise<Array>} Array of featured menu items
 */
export const getFeaturedMenuItems = async () => {
  // First try to get popular items
  const { data: popularItems, error: popularError } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_popular', true)
    .order('name');
  
  if (popularError) throw popularError;
  
  // If no popular items, get all items
  if (!popularItems || popularItems.length === 0) {
    const { data: allItems, error: allError } = await supabase
      .from('menu_items')
      .select('*')
      .order('name')
      .limit(20);
    
    if (allError) throw allError;
    
    return allItems.map(item => ({
      ...item,
      price_ethiopian: item.price_local,
      price_foreigner: item.price_foreign
    }));
  }
  
  // Convert database format to frontend format
  return popularItems.map(item => ({
    ...item,
    price_ethiopian: item.price_local,
    price_foreigner: item.price_foreign,
    is_featured: true
  }));
};

/**
 * Send a customer suggestion
 * @param {Object} suggestion - {name: string (optional), message: string}
 * @returns {Promise<Object>} Success response
 */
export const sendSuggestion = async (suggestion) => {
  // Validation
  if (!suggestion.message || suggestion.message.trim() === '') {
    throw new Error('Message is required');
  }
  
  const { data, error } = await supabase
    .from('suggestions')
    .insert([{
      name: suggestion.name || null,
      message: suggestion.message.trim()
    }])
    .select()
    .single();
  
  if (error) throw error;
  
  return {
    success: true,
    message: 'Thank you for your feedback!',
    data
  };
};
