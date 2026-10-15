import React from 'react';

const CategoryList = ({ categories, items, onEdit }) => {
  // Count items per category
  const getItemCount = (categoryId) => {
    return items.filter(item => item.category_id === categoryId).length;
  };

  return (
    <>
      {/* Mobile helper hint */}
      <div className="md:hidden text-xs text-white/90 mb-2 flex items-center gap-1.5 px-1">
        <span className="bg-[#F9A809] text-[#212E50] px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">
          Tip
        </span>
        <span>Tap any category row to edit</span>
      </div>

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
            </tr>
          </thead>
          <tbody className="bg-[#E8EDF5] divide-y divide-gray-200">
            {categories.map((category) => {
              const itemCount = getItemCount(category.id);
              return (
                <tr 
                  key={category.id} 
                  onClick={() => onEdit(category)}
                  className="hover:bg-blue-50/70 active:bg-blue-100/70 cursor-pointer transition-colors"
                  title="Tap or click to edit category"
                >
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryList;
