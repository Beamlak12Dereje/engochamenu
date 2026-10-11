import { mockAdmin } from '../data/mockData';

// Mock login - replace with real API call later
export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === mockAdmin.email && password === mockAdmin.password) {
        resolve({
          data: {
            token: mockAdmin.token,
            admin: { name: mockAdmin.name, email: mockAdmin.email },
          },
        });
      } else {
        reject({ response: { data: { message: 'Invalid credentials' } } });
      }
    }, 500);
  });
};

// Real API call (commented out for now)
// import client from './client';
// export const login = (email, password) => {
//   return client.post('/api/auth/login', { email, password });
// };
