import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomeSection from './sections/HomeSection';
import MenuSection from './sections/MenuSection';
import ContactSection from './sections/ContactSection';
import { useMenu } from './hooks/useMenu';
import { PricingProvider } from './context/PricingContext';

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
    <PricingProvider>
    <div className="min-h-screen relative">
      {/* Fixed background image - works on all screen sizes */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      />
      
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
    </PricingProvider>
  );
}

export default App;
