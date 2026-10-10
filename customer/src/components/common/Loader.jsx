import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-brand-purple/20 border-t-brand-purple rounded-full animate-spin"></div>
      <p className="mt-4 text-brand-blue/60 font-semibold">Loading menu...</p>
    </div>
  );
};

export default Loader;
