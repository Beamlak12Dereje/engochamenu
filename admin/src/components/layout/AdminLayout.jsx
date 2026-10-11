import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#212E50] flex flex-col">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="lg:ml-64 flex flex-col flex-1">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6 flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
