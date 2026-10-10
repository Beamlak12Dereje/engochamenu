// API wrapper for menu data
// Currently uses mock data - will switch to real API calls later

import { mockCategories, mockMenuItems, getFeaturedItems } from '../data/mockMenu';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all categories
 * @returns {Promise<Array>} Array of category objects
 */
export const getCategories = async () => {
  await delay(300); // Simulate network delay
  return mockCategories;
};

/**
 * Get all menu items
 * @param {number} categoryId - Optional category filter
 * @returns {Promise<Array>} Array of menu item objects
 */
export const getItems = async (categoryId = null) => {
  await delay(500); // Simulate network delay
  
  if (categoryId) {
    return mockMenuItems.filter(item => item.category_id === categoryId);
  }
  
  return mockMenuItems;
};

/**
 * Get featured items for the home slider
 * @returns {Promise<Array>} Array of featured menu items
 */
export const getFeaturedMenuItems = async () => {
  await delay(300);
  return getFeaturedItems();
};

/**
 * Send a customer suggestion
 * @param {Object} suggestion - {name: string (optional), message: string}
 * @returns {Promise<Object>} Success response
 */
export const sendSuggestion = async (suggestion) => {
  await delay(800); // Simulate network delay
  
  // Validation
  if (!suggestion.message || suggestion.message.trim() === '') {
    throw new Error('Message is required');
  }
  
  // Mock success response
  console.log('Suggestion submitted:', suggestion);
  return {
    success: true,
    message: 'Thank you for your feedback!',
  };
};

// When switching to real API, replace the functions above with:
/*
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const getItems = async (categoryId = null) => {
  const url = categoryId 
    ? `${API_BASE_URL}/items?category=${categoryId}`
    : `${API_BASE_URL}/items`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch items');
  return response.json();
};

export const getFeaturedMenuItems = async () => {
  const response = await fetch(`${API_BASE_URL}/items?featured=true`);
  if (!response.ok) throw new Error('Failed to fetch featured items');
  return response.json();
};

export const sendSuggestion = async (suggestion) => {
  const response = await fetch(`${API_BASE_URL}/suggestions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(suggestion),
  });
  if (!response.ok) throw new Error('Failed to send suggestion');
  return response.json();
};
*/
