import React, { useState } from 'react';
import { Menu, X, Send, Phone } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('ethiopian');
  const [contactDevOpen, setContactDevOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Contact', href: '#contact' },
  ];

  const developerLinks = [
    { 
      name: 'Telegram', 
      icon: <Send size={18} />, 
      url: 'https://t.me/yourusername' 
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ), 
      url: 'https://instagram.com/yourusername' 
    },
    { 
      name: 'WhatsApp', 
      icon: <Phone size={18} />, 
      url: 'https://wa.me/yourphonenumber' 
    },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-brand-blue/10" style={{ height: '72.93px' }}>
        <div className="mx-auto px-4 h-full w-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo - LEFT */}
            <a href="#home" className="flex items-center flex-shrink-0">
              <img 
                src="/images/logo.png" 
                alt="Engocha" 
                className="w-26 h-16 object-contain"
              />
            </a>

            {/* Desktop Navigation - RIGHT */}
            <div className="hidden md:flex items-center gap-6 relative">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/50 border border-brand-blue/20 rounded-full px-4 py-2 pr-8 text-base font-semibold text-brand-blue hover:border-brand-purple focus:outline-none focus:border-brand-purple transition-colors cursor-pointer appearance-none bg-no-repeat bg-right"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23212E50' d='M4 6l4 4 4-4z'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center'
                }}
              >
                <option value="ethiopian">Ethiopian</option>
                <option value="foreigner">Foreigner</option>
              </select>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-semibold text-brand-blue hover:text-brand-purple transition-colors whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}

              {/* Contact Developer Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setContactDevOpen(!contactDevOpen)}
                  className="text-base font-semibold text-brand-blue hover:text-brand-purple transition-colors whitespace-nowrap"
                >
                  Contact Developer
                </button>
                
                {contactDevOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setContactDevOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-brand-blue rounded-2xl shadow-2xl overflow-hidden z-20">
                      {developerLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                        >
                          {link.icon}
                          <span className="font-semibold">{link.name}</span>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile: Language Selector + Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {/* Language Selector - Mobile */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/50 border border-brand-blue/20 rounded-full px-3 py-1.5 pr-7 text-sm font-semibold text-brand-blue focus:outline-none focus:border-brand-purple transition-colors cursor-pointer appearance-none bg-no-repeat bg-right"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath fill='%23212E50' d='M3 5l4 4 4-4z'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.4rem center'
                }}
              >
                <option value="ethiopian">Ethiopian</option>
                <option value="foreigner">Foreigner</option>
              </select>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl text-brand-blue hover:bg-brand-blue/10 transition-all"
                aria-label="Toggle menu"
              >
                <Menu size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer - Slides from RIGHT */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col animate-[slideIn_0.3s_ease-out]">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-purple/10">
              <img 
                src="/images/logo.png" 
                alt="Engocha" 
                className="w-24 h-24 object-contain"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-brand-blue hover:bg-brand-purple/5 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            {/* Drawer Menu Items */}
            <nav className="flex-1 overflow-y-auto p-6">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`block text-brand-blue font-bold text-xl py-4 px-6 rounded-2xl mb-3 transition-all hover:bg-brand-purple/5 ${
                    index === 0 ? 'border-2 border-brand-yellow bg-brand-yellow/10' : ''
                  }`}
                >
                  {link.name}
                </a>
              ))}

              {/* Contact Developer Section */}
              <div className="mt-6 pt-6 border-t border-brand-blue/10">
                <p className="text-brand-blue/60 font-semibold text-sm mb-3 px-6">Contact Developer</p>
                {developerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 text-brand-blue font-bold text-lg py-3 px-6 rounded-2xl mb-2 transition-all hover:bg-brand-purple/5"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
