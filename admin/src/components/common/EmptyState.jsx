import React from 'react';

const EmptyState = ({ message, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center bg-[#E8EDF5] rounded-lg shadow p-8">
      <div className="text-6xl mb-4">📝</div>
      <p className="text-gray-500 mb-4">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-white text-[#212E50] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
