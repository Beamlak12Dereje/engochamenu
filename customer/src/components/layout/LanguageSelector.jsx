import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePricing } from '../../context/PricingContext';

const LanguageSelector = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { priceType, togglePriceType } = usePricing();
  const dropdownRef = useRef(null);

  const options = [
    { value: 'ethiopian', label: 'Ethiopian' },
    { value: 'foreigner', label: 'Foreigner' }
  ];

  const selectedOption = options.find(opt => opt.value === priceType);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    togglePriceType(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 bg-white/90 border border-brand-blue/20 rounded-full transition-colors cursor-pointer shadow-sm hover:border-brand-purple ${
          isMobile 
            ? 'px-2.5 py-1 text-xs' 
            : 'px-3 py-1.5 text-sm'
        }`}
        style={{ backgroundColor: '#E8EDF5' }}
      >
        <span className="font-medium text-brand-blue">{selectedOption?.label}</span>
        <ChevronDown size={isMobile ? 12 : 14} className="text-brand-blue" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full mt-1 right-0 rounded-2xl overflow-hidden shadow-xl border border-brand-blue/20 z-50"
          style={{ backgroundColor: '#E8EDF5', minWidth: '120px' }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                option.value === priceType
                  ? 'bg-brand-blue text-white'
                  : 'text-brand-blue hover:bg-white/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
