import React from 'react';
import { RESTAURANT_NAME } from '../../constants';

const Footer = () => {
  return (
    <footer className="bg-[#E8EDF5] border-t border-gray-200 py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-600 text-sm">
          <p className="font-semibold">
            {RESTAURANT_NAME} Admin Panel
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} {RESTAURANT_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
