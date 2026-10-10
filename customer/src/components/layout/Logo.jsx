import React from 'react';
import logoImg from '../assets/logo.png';

const Logo = ({ className = "", size = "small" }) => {
  const isLarge = size === "large";
  const isMedium = size === "medium";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative flex-shrink-0 flex items-center justify-center ${
        isLarge
          ? 'w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48'
          : isMedium
          ? 'w-16 h-16 md:w-20 md:h-20'
          : 'w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20'
      } ${isLarge ? 'drop-shadow-2xl' : ''}`}>
        <img src={logoImg} alt="Engocha Logo" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default Logo;
