import React, { useState } from 'react';
import { CURRENCY } from '../../data/mockMenu';
import { X } from 'lucide-react';

const MenuItemCard = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group hover:shadow-yellow-500/50 w-full h-[280px] lg:h-[360px] relative cursor-pointer"
        style={{ 
          backgroundColor: '#FFF9E6',
          boxShadow: '0 4px 6px -1px rgba(249, 168, 9, 0.3), 0 2px 4px -2px rgba(249, 168, 9, 0.3)' 
        }}
      >
        {/* Mobile Layout - Image on top, content below */}
        <div className="lg:hidden">
          {/* Image */}
          <div className="relative overflow-hidden">
            <img 
              src={item.image_url} 
              alt={item.name}
              className="w-full object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-700 h-[160px]"
              onError={(e) => {
                e.target.src = '/images/fallback-food.jpg';
              }}
            />
          </div>

          {/* Content */}
          <div className="p-2.5 flex flex-col gap-1 h-[100px]">
            {/* Name */}
            <h3 className="text-sm font-bold text-brand-blue group-hover:text-brand-purple transition-colors line-clamp-2 leading-tight">
              {item.name}
            </h3>
            
            {/* Description (ingredients) */}
            <p className="text-brand-blue/70 text-xs line-clamp-2 font-medium leading-tight">
              {item.description}
            </p>
            
            {/* Price */}
            <div className="mt-auto">
              <span className="text-brand-purple font-bold text-sm">
                {item.price} {CURRENCY}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Image fills card, text overlay at bottom */}
        <div className="hidden lg:block h-full relative">
          {/* Full card image */}
          <img 
            src={item.image_url} 
            alt={item.name}
            className="w-full h-full object-cover rounded-3xl group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.src = '/images/fallback-food.jpg';
            }}
          />
          
          {/* Overlay content at bottom with transparent background */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 rounded-b-3xl">
            {/* Name */}
            <h3 className="text-base font-bold text-white group-hover:text-brand-yellow transition-colors line-clamp-2 leading-tight mb-1.5">
              {item.name}
            </h3>
            
            {/* Description (ingredients) */}
            <p className="text-white/80 text-sm line-clamp-2 font-medium leading-tight mb-2">
              {item.description}
            </p>
            
            {/* Price */}
            <span className="text-brand-yellow font-bold text-base">
              {item.price} {CURRENCY}
            </span>
          </div>
        </div>
      </div>

      {/* Modal - Full Item Details */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-brand-yellow text-brand-purple p-2 rounded-full hover:bg-white transition-colors z-10 border-2 border-brand-purple"
            >
              <X size={20} strokeWidth={3} />
            </button>

            {/* Image */}
            <div className="relative h-64">
              <img 
                src={item.image_url} 
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/fallback-food.jpg';
                }}
              />
            </div>

            {/* Content with whitish yellow overlay */}
            <div className="text-brand-blue p-6 rounded-b-3xl" style={{ backgroundColor: '#FFF9E6' }}>
              {/* Name */}
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                {item.name}
              </h2>

              {/* Description */}
              <p className="text-brand-blue/80 text-center text-sm mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Price */}
              <div className="text-center mb-6">
                <span className="text-brand-purple font-bold text-3xl">
                  {item.price} {CURRENCY}
                </span>
              </div>

              {/* Ingredients Section */}
              <div className="bg-brand-purple/10 rounded-2xl p-4">
                <h3 className="text-brand-purple font-bold text-lg mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {item.description.split(',').slice(0, 5).map((ingredient, index) => (
                    <span 
                      key={index}
                      className="bg-brand-purple/20 px-3 py-1.5 rounded-full text-sm text-brand-purple"
                    >
                      {ingredient.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;
