import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout, admin } = useAuth();

  const menuItems = [
    { path: '/items', label: 'Items' },
    { path: '/categories', label: 'Categories' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#E8EDF5] text-gray-800 z-50 transform transition-transform duration-300 lg:translate-x-0 shadow-xl flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <img 
            src="/images/logo.png" 
            alt="ENGOCHA" 
            className="w-32 h-32 object-contain"
          />
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`block px-4 py-3 rounded-xl mb-2 transition-colors font-semibold border-2 ${
                isActive(item.path)
                  ? 'bg-[#E8EDF5] border-[#212E50] text-gray-700'
                  : 'text-gray-700 border-transparent hover:bg-[#212E50]/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Admin Info - Desktop Only */}
        <div className="hidden lg:block p-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 bg-[#212E50] text-white px-4 py-3 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-semibold">
              {admin?.name || 'Admin'}
            </span>
          </div>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-gray-200 lg:border-t-0">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-[#500840] text-white rounded-lg hover:bg-[#500840]/90 transition-colors font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
