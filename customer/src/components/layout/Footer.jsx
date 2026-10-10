import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm md:text-base font-semibold">
          © {currentYear} Engocha Restaurant. All rights reserved.
        </p>
        <p className="text-xs md:text-sm text-white/70 mt-2">
          Taste of Ethiopia
        </p>
      </div>
    </footer>
  );
};

export default Footer;
