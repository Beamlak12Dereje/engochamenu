import Hero from '../components/home/Hero';
import SearchBar from '../components/home/SearchBar';
import FoodSlider from '../components/home/FoodSlider';

const HomeSection = ({ onSearch, featuredItems, loading }) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center py-12">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/20 z-0"></div>
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {/* Hero and Search - centered with max-width */}
        <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center">
          <Hero />
          <SearchBar onSearch={onSearch} />
        </div>
        
        {/* Food Slider - full width, no padding */}
        {!loading && (
          <div className="w-full mt-4">
            <FoodSlider items={featuredItems} />
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeSection;
