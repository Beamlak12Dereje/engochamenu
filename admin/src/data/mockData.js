// Mock categories
export const mockCategories = [
  { id: 1, name: 'Traditional Dishes' },
  { id: 2, name: 'Fasting Food' },
  { id: 3, name: 'Appetizers' },
  { id: 4, name: 'Desserts' },
  { id: 5, name: 'Beverages' },
];

// Mock menu items
export const mockItems = [
  {
    id: 1,
    category_id: 1,
    name: 'Doro Wot',
    description: 'Spicy chicken stew with hard-boiled eggs',
    price_ethiopian: 350,
    price_foreigner: 500,
    image_url: '/images/burger.jpg',
    is_popular: true,
    is_spicy: true,
  },
  {
    id: 2,
    category_id: 1,
    name: 'Kitfo',
    description: 'Minced raw beef mixed with spiced butter',
    price_ethiopian: 400,
    price_foreigner: 600,
    image_url: '/images/cake.jpg',
    is_popular: true,
    is_spicy: false,
  },
  {
    id: 3,
    category_id: 2,
    name: 'Shiro Wot',
    description: 'Chickpea flour stew with spices',
    price_ethiopian: 150,
    price_foreigner: 250,
    image_url: '/images/salad.jpg',
    is_popular: false,
    is_spicy: true,
  },
  {
    id: 4,
    category_id: 3,
    name: 'Sambusa',
    description: 'Crispy pastry filled with lentils or meat',
    price_ethiopian: 80,
    price_foreigner: 120,
    image_url: '/images/burger.jpg',
    is_popular: false,
    is_spicy: false,
  },
  {
    id: 5,
    category_id: 4,
    name: 'Baklava',
    description: 'Sweet pastry with honey and nuts',
    price_ethiopian: 120,
    price_foreigner: 180,
    image_url: '/images/cake.jpg',
    is_popular: true,
    is_spicy: false,
  },
];

// Mock admin credentials
export const mockAdmin = {
  email: 'admin@engocha.com',
  password: 'admin123',
  token: 'mock-jwt-token-12345',
  name: 'Admin',
};
