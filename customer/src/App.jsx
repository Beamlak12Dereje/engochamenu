import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomeSection from './sections/HomeSection';
import MenuSection from './sections/MenuSection';
import ContactSection from './sections/ContactSection';
import { useMenu } from './hooks/useMenu';

function App() {
  const {
    categories,
    featuredItems,
    itemsByCategory,
    loading,
    error,
    searchText,
    selectedCategoryId,
    handleSearch,
    handleCategoryChange,
  } = useMenu();

  return (
    <div className="min-h-screen relative">
      {/* Mobile background - normal */}
      <div className="md:hidden fixed inset-0 -z-10 bg-cover bg-center bg-fixed" 
           style={{ backgroundImage: "url('/images/bg.jpg')" }}>
      </div>
      
      {/* Desktop/Tablet background - rotated 90deg, 100% coverage */}
      <div className="hidden md:block fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute bg-center bg-cover"
             style={{ 
               backgroundImage: "url('/images/bg.jpg')",
               transform: 'rotate(270deg)',
               transformOrigin: 'center',
               width: '100vh',
               height: '100vw',
               top: '60%',
               left: '50%',
               marginLeft: '-50vh',
               marginTop: '-50vw'
             }}>
        </div>
      </div>
      
      <Navbar />
      <main>
        <HomeSection 
          searchText={searchText}
          onSearch={handleSearch}
          featuredItems={featuredItems}
          loading={loading}
        />
        <MenuSection 
          categories={categories}
          itemsByCategory={itemsByCategory}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={handleCategoryChange}
          loading={loading}
          error={error}
          searchText={searchText}
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
