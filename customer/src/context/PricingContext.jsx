import { createContext, useContext, useState } from 'react';

const PricingContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within PricingProvider');
  }
  return context;
};

export const PricingProvider = ({ children }) => {
  const [priceType, setPriceType] = useState('ethiopian'); // 'ethiopian' or 'foreigner'

  const togglePriceType = (type) => {
    setPriceType(type);
  };

  return (
    <PricingContext.Provider value={{ priceType, togglePriceType }}>
      {children}
    </PricingContext.Provider>
  );
};
