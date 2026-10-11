import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#F9A809]"></div>
    </div>
  );
};

export default Loader;
