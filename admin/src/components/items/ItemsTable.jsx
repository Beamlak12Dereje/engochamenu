import React from 'react';
import { CURRENCY } from '../../constants';

const ItemsTable = ({ items, categories, onEdit, onTogglePopular, onToggleSpicy }) => {
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <>
      {/* Mobile helper hint */}
      <div className="md:hidden text-xs text-white/90 mb-2 flex items-center gap-1.5 px-1">
        <span className="bg-[#F9A809] text-[#212E50] px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">
          Tip
        </span>
        <span>Tap any item row to edit</span>
      </div>

      <div className="bg-[#E8EDF5] rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#D5E0F0]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Ethiopian Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Foreigner Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                Popular
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                Spicy
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#E8EDF5] divide-y divide-gray-200">
            {items.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onEdit(item)}
                className="hover:bg-blue-50/70 active:bg-blue-100/70 cursor-pointer transition-colors"
                title="Tap or click to edit item"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {item.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getCategoryName(item.category_id)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.price_ethiopian} {CURRENCY}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.price_foreigner} {CURRENCY}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePopular(item.id, !item.is_popular);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      item.is_popular
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {item.is_popular ? '⭐ Popular' : 'Popular'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSpicy(item.id, !item.is_spicy);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      item.is_spicy
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {item.is_spicy ? '🔥 Spicy' : 'Spicy'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsTable;
