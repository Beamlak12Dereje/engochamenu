import React from 'react';

const SectionTitle = ({ children, className = '' }) => {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold text-brand-purple mb-8 ${className}`}>
      {children}
    </h2>
  );
};

export default SectionTitle;
