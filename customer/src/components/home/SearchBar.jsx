import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  // Debounce search - wait 2000ms (2 seconds) after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 2000);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value); // Immediate search on submit
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative w-full max-w-sm md:max-w-md mb-8 md:mb-12 animate-fade-in-up" 
      style={{ animationDelay: '350ms' }}
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search for items..."
        className="w-full bg-white/40 backdrop-blur-md text-brand-blue placeholder-brand-blue/60 border border-brand-blue/20 rounded-full py-2.5 md:py-3 pl-5 md:pl-6 pr-12 md:pr-14 focus:outline-none focus:border-brand-purple focus:bg-white/60 text-sm md:text-base transition-all font-normal"
      />
      <button 
        type="submit"
        className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-brand-yellow p-2 md:p-2.5 rounded-full text-brand-blue hover:bg-brand-purple hover:text-white transition-colors group"
      >
        <Search size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
      </button>
    </form>
  );
};

export default SearchBar;
