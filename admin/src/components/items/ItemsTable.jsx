import React, { useState } from 'react';
import ConfirmDialog from '../common/ConfirmDialog';
import { CURRENCY } from '../../constants';

const ItemsTable = ({ items, categories, onEdit, onDelete, onTogglePopular, onToggleSpicy }) => {
  const [deleteId, setDeleteId] = useState(null);

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <>
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
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#E8EDF5] divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
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
                    onClick={() => onTogglePopular(item.id, !item.is_popular)}
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
                    onClick={() => onToggleSpicy(item.id, !item.is_spicy)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      item.is_spicy
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {item.is_spicy ? '🔥 Spicy' : 'Spicy'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-[#2C5F7C] hover:text-[#2C5F7C]/80 mr-4"
                    title="Edit"
                  >
                    <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          onDelete(deleteId);
          setDeleteId(null);
        }}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </>
  );
};

export default ItemsTable;
