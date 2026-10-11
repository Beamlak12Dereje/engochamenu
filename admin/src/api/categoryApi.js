import { mockCategories } from '../data/mockData';

let categories = [...mockCategories];
let nextId = Math.max(...categories.map(c => c.id)) + 1;

// Mock API calls - replace with real API later
export const getCategories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: categories });
    }, 300);
  });
};

export const createCategory = async (categoryData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCategory = { id: nextId++, ...categoryData };
      categories.push(newCategory);
      resolve({ data: newCategory });
    }, 300);
  });
};

export const updateCategory = async (id, categoryData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = categories.findIndex(c => c.id === id);
      if (index !== -1) {
        categories[index] = { ...categories[index], ...categoryData };
        resolve({ data: categories[index] });
      }
    }, 300);
  });
};

export const deleteCategory = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if category has items (will implement later with items)
      const index = categories.findIndex(c => c.id === id);
      if (index !== -1) {
        categories.splice(index, 1);
        resolve({ data: { message: 'Category deleted' } });
      } else {
        reject({ response: { data: { message: 'Category not found' } } });
      }
    }, 300);
  });
};

// Real API calls (commented out for now)
// import client from './client';
// export const getCategories = () => client.get('/api/categories');
// export const createCategory = (data) => client.post('/api/categories', data);
// export const updateCategory = (id, data) => client.put(`/api/categories/${id}`, data);
// export const deleteCategory = (id) => client.delete(`/api/categories/${id}`);
