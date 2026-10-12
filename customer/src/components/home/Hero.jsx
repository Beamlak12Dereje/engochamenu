import React from 'react';

const Hero = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center text-center mb-8 md:mb-10">
      {/* Logo */}
      <div className="mb-4 md:mb-6">
        <img 
          src="/images/logo.png" 
          alt="Engocha" 
          className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl animate-fade-in-up"
        />
      </div>

      {/* Tagline */}
      <p className="text-xs md:text-sm text-brand-blue font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase mb-6 md:mb-8 animate-fade-in-up" 
         style={{ animationDelay: '150ms' }}>
        Where Real Taste Begins
      </p>

      {/* Explore Menu Button */}
      <button
        onClick={scrollToMenu}
        className="bg-brand-yellow text-brand-blue font-semibold text-sm md:text-base px-8 md:px-10 py-2.5 md:py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-md animate-fade-in-up"
        style={{ animationDelay: '250ms' }}
      >
        Explore Menu
      </button>
    </div>
  );
};

export default Hero;
