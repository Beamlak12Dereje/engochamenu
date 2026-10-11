import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
        <Link
          to="/items"
          className="px-6 py-3 bg-[#F9A809] text-white rounded-lg hover:bg-[#F9A809]/90 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
