// Mock data for development - will be replaced with API calls later

export const CURRENCY = 'Birr';

export const mockCategories = [
  { id: 1, name: 'Traditional Dishes' },
  { id: 2, name: 'Grills' },
  { id: 3, name: 'Vegetarian' },
  { id: 4, name: 'Beverages' },
  { id: 5, name: 'Desserts' },
];

export const mockMenuItems = [
  // Traditional Dishes
  {
    id: 1,
    category_id: 1,
    name: 'Doro Wot',
    description: 'Spicy chicken stew with hard-boiled eggs, served with injera',
    price: 250,
    image_url: '/images/burger.jpg',
    is_available: true,
    is_featured: true,
  },
  {
    id: 2,
    category_id: 1,
    name: 'Kitfo',
    description: 'Minced raw beef mixed with mitmita and butter',
    price: 280,
    image_url: '/images/salad.jpg',
    is_available: true,
    is_featured: true,
  },
  {
    id: 3,
    category_id: 1,
    name: 'Tibs',
    description: 'Sautéed beef with onions, peppers and Ethiopian spices',
    price: 220,
    image_url: '/images/cake.jpg',
    is_available: true,
    is_featured: false,
  },
  {
    id: 4,
    category_id: 1,
    name: 'Shiro',
    description: 'Chickpea stew with berbere spice blend',
    price: 150,
    image_url: '/images/burger.jpg',
    is_available: true,
    is_featured: false,
  },

  // Grills
  {
    id: 5,
    category_id: 2,
    name: 'Mixed Grill',
    description: 'Combination of beef, chicken and lamb grilled to perfection',
    price: 350,
    image_url: '/images/salad.jpg',
    is_available: true,
    is_featured: true,
  },
  {
    id: 6,
    category_id: 2,
    name: 'Lamb Chops',
    description: 'Tender lamb chops marinated with rosemary and garlic',
    price: 320,
    image_url: '/images/cake.jpg',
    is_available: false,
    is_featured: false,
  },
  {
    id: 7,
    category_id: 2,
    name: 'Chicken Kebab',
    description: 'Grilled chicken skewers with bell peppers and onions',
    price: 200,
    image_url: '/images/burger.jpg',
    is_available: true,
    is_featured: false,
  },

  // Vegetarian
  {
    id: 8,
    category_id: 3,
    name: 'Beyaynetu',
    description: 'Vegetarian combo platter with assorted lentils and vegetables',
    price: 180,
    image_url: '/images/salad.jpg',
    is_available: true,
    is_featured: true,
  },
  {
    id: 9,
    category_id: 3,
    name: 'Gomen',
    description: 'Collard greens cooked with garlic, ginger and spices',
    price: 120,
    image_url: '/images/cake.jpg',
    is_available: true,
    is_featured: false,
  },
  {
    id: 10,
    category_id: 3,
    name: 'Misir Wot',
    description: 'Red lentil stew with berbere spice',
    price: 130,
    image_url: '/images/burger.jpg',
    is_available: true,
    is_featured: false,
  },

  // Beverages
  {
    id: 11,
    category_id: 4,
    name: 'Ethiopian Coffee',
    description: 'Traditional coffee ceremony - freshly roasted and brewed',
    price: 50,
    image_url: '/images/salad.jpg',
    is_available: true,
    is_featured: false,
  },
  {
    id: 12,
    category_id: 4,
    name: 'Tej',
    description: 'Ethiopian honey wine - sweet and slightly sparkling',
    price: 80,
    image_url: '/images/cake.jpg',
    is_available: true,
    is_featured: false,
  },
  {
    id: 13,
    category_id: 4,
    name: 'Fresh Mango Juice',
    description: 'Freshly squeezed mango juice',
    price: 60,
    image_url: '/images/burger.jpg',
    is_available: true,
    is_featured: false,
  },

  // Desserts
  {
    id: 14,
    category_id: 5,
    name: 'Baklava',
    description: 'Sweet pastry with honey and nuts',
    price: 90,
    image_url: '/images/salad.jpg',
    is_available: true,
    is_featured: false,
  },
  {
    id: 15,
    category_id: 5,
    name: 'Honey Cake',
    description: 'Traditional Ethiopian honey cake',
    price: 70,
    image_url: '/images/cake.jpg',
    is_available: false,
    is_featured: false,
  },
];

// Helper function to get items by category
export const getItemsByCategory = (categoryId) => {
  return mockMenuItems.filter(item => item.category_id === categoryId);
};

// Helper function to get featured items
export const getFeaturedItems = () => {
  return mockMenuItems.filter(item => item.is_featured && item.is_available);
};

// Helper function to get category name by id
export const getCategoryName = (categoryId) => {
  const category = mockCategories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Unknown';
};
