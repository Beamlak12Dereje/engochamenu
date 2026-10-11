import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Topbar = ({ onMenuClick }) => {
  const { admin } = useAuth();

  return (
    <header className="bg-[#E8EDF5] border-b border-gray-300 px-6 py-4 lg:hidden">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-gray-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Title (hidden on mobile, shows on desktop) */}
        <div className="hidden lg:block">
          {/* Page title will be added here by pages */}
        </div>

        {/* Admin Info */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2 bg-[#212E50] text-white px-4 py-2 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-semibold">
              {admin?.name || 'Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
