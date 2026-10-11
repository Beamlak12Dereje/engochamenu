import { mockItems } from '../data/mockData';

let items = [...mockItems];
let nextId = Math.max(...items.map(i => i.id)) + 1;

// Mock API calls - replace with real API later
export const getItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: items });
    }, 300);
  });
};

export const createItem = async (itemData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItem = { id: nextId++, ...itemData };
      items.push(newItem);
      resolve({ data: newItem });
    }, 300);
  });
};

export const updateItem = async (id, itemData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = items.findIndex(i => i.id === id);
      if (index !== -1) {
        items[index] = { ...items[index], ...itemData };
        resolve({ data: items[index] });
      }
    }, 300);
  });
};

export const deleteItem = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = items.findIndex(i => i.id === id);
      if (index !== -1) {
        items.splice(index, 1);
        resolve({ data: { message: 'Item deleted' } });
      } else {
        reject({ response: { data: { message: 'Item not found' } } });
      }
    }, 300);
  });
};

// Real API calls (commented out for now)
// import client from './client';
// export const getItems = () => client.get('/api/items');
// export const createItem = (data) => client.post('/api/items', data);
// export const updateItem = (id, data) => client.put(`/api/items/${id}`, data);
// export const deleteItem = (id) => client.delete(`/api/items/${id}`);
