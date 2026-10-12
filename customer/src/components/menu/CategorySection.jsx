import React from 'react';
import MenuItemCard from './MenuItemCard';

const CategorySection = ({ categoryName, items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  // Map category names to emojis
  const categoryEmojis = {
    'Breakfast': '🍳',
    'Lunch': '🍱',
    'Dinner': '🍽️',
    'Drinks': '🥤',
    'Desserts': '🍰',
    'Appetizers': '🥗'
  };

  const emoji = categoryEmojis[categoryName] || '🍴';

  return (
    <div className="mb-16" id={`category-${categoryName}`}>
      {/* Category Title - centered */}
      <div className="mb-8 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white py-2 capitalize">
          {categoryName}
        </h3>
      </div>

      {/* Items Grid - Mobile: 2 cols wider cards, Desktop: 3 cols */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" style={{ padding: '0 4px 0 4px' }}>
        <style jsx>{`
          @media (min-width: 1024px) {
            div[style*="padding"] {
              padding: 0 40px !important;
            }
          }
        `}</style>
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
