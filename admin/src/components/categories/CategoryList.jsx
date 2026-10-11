import React, { useState } from 'react';
import ConfirmDialog from '../common/ConfirmDialog';

const CategoryList = ({ categories, items, onEdit, onDelete }) => {
  const [deleteId, setDeleteId] = useState(null);

  // Count items per category
  const getItemCount = (categoryId) => {
    return items.filter(item => item.category_id === categoryId).length;
  };

  const handleDelete = (categoryId) => {
    const itemCount = getItemCount(categoryId);
    if (itemCount > 0) {
      alert(`Cannot delete this category. It has ${itemCount} item(s). Please move or delete the items first.`);
      setDeleteId(null);
      return;
    }
    onDelete(categoryId);
    setDeleteId(null);
  };

  return (
    <>
      <div className="bg-[#E8EDF5] rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#D5E0F0]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Number of Items
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#E8EDF5] divide-y divide-gray-200">
            {categories.map((category) => {
              const itemCount = getItemCount(category.id);
              return (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(category)}
                      className="text-[#2C5F7C] hover:text-[#2C5F7C]/80 mr-4"
                      title="Edit"
                    >
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteId(category.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </>
  );
};

export default CategoryList;
