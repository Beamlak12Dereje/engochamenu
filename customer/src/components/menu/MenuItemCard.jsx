import { useState } from 'react';
import { CURRENCY } from '../../constants';
import { X, Flame } from 'lucide-react';
import { usePricing } from '../../context/PricingContext';

const MenuItemCard = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const { priceType } = usePricing();

  // Determine which price to display based on selected price type
  const displayPrice = priceType === 'foreigner' 
    ? (item.price_foreign || item.price_local || item.price) 
    : (item.price_local || item.price_ethiopian || item.price);

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
        {/* Badges - Top of card */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
          {/* Popular Badge - Left */}
          {item.is_popular && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold text-xs backdrop-blur-sm animate-fade-in" style={{ backgroundColor: 'rgba(249, 168, 9, 0.95)' }}>
              <span className="text-sm">⭐</span>
              <span className="text-brand-purple">Popular</span>
            </div>
          )}
          
          {/* Spicy Badge - Right */}
          {item.is_spicy && (
            <div className="ml-auto w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center animate-fade-in" style={{ backgroundColor: 'rgba(220, 38, 38, 0.95)' }}>
              <Flame size={14} className="text-white fill-white" />
            </div>
          )}
        </div>

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
            <h3 className="text-sm font-bold text-brand-blue group-hover:text-brand-purple transition-colors line-clamp-2 leading-tight capitalize">
              {item.name}
            </h3>
            
            {/* Description (ingredients) */}
            <p className="text-brand-blue/70 text-xs line-clamp-2 font-medium leading-tight">
              {item.description}
            </p>
            
            {/* Price */}
            <div className="mt-auto">
              <span className="text-brand-purple font-bold text-sm">
                {displayPrice} {CURRENCY}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Image fills card, text overlay at bottom */}
        <div className="hidden lg:block h-full relative">
          {/* Badges - Top of card */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start z-10">
            {/* Popular Badge - Left */}
            {item.is_popular && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-sm backdrop-blur-sm animate-fade-in" style={{ backgroundColor: 'rgba(249, 168, 9, 0.95)' }}>
                <span className="text-base">⭐</span>
                <span className="text-brand-purple">Popular</span>
              </div>
            )}
            
            {/* Spicy Badge - Right */}
            {item.is_spicy && (
              <div className="ml-auto w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center animate-fade-in" style={{ backgroundColor: 'rgba(220, 38, 38, 0.95)' }}>
                <Flame size={18} className="text-white fill-white" />
              </div>
            )}
          </div>

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
            <h3 className="text-base font-bold text-white group-hover:text-brand-yellow transition-colors line-clamp-2 leading-tight mb-1.5 capitalize">
              {item.name}
            </h3>
            
            {/* Description (ingredients) */}
            <p className="text-white/80 text-sm line-clamp-2 font-medium leading-tight mb-2">
              {item.description}
            </p>
            
            {/* Price */}
            <span className="text-brand-yellow font-bold text-base">
              {displayPrice} {CURRENCY}
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
            className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto relative scrollbar-hide"
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
            <div className="text-brand-blue p-6 rounded-b-3xl relative" style={{ backgroundColor: '#FFF9E6' }}>
              {/* Badges - Top corners */}
              {(item.is_popular || item.is_spicy) && (
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  {/* Popular Badge - Left */}
                  {item.is_popular && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-sm" style={{ backgroundColor: 'rgba(249, 168, 9, 0.95)' }}>
                      <span className="text-base">⭐</span>
                      <span className="text-brand-purple">Popular</span>
                    </div>
                  )}
                  
                  {/* Spicy Badge - Right */}
                  {item.is_spicy && (
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${!item.is_popular ? 'ml-auto' : ''}`} style={{ backgroundColor: 'rgba(220, 38, 38, 0.95)' }}>
                      <Flame size={18} className="text-white fill-white" />
                    </div>
                  )}
                </div>
              )}

              {/* Name */}
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 capitalize pt-4">
                {item.name}
              </h2>

              {/* Ingredients / Description Section - Show Full Text */}
              {item.description && (
                <div className="bg-brand-purple/10 rounded-2xl p-4 mb-6">
                  {item.description.includes(',') ? (
                    <div className="flex flex-wrap gap-2">
                      {item.description
                        .split(',')
                        .map((ing) => ing.trim())
                        .filter(Boolean)
                        .map((ingredient, index) => (
                          <span 
                            key={index}
                            className="bg-brand-purple/20 px-3 py-1.5 rounded-full text-sm font-medium text-brand-purple"
                          >
                            {ingredient}
                          </span>
                        ))}
                    </div>
                  ) : (
                    <p className="text-brand-purple text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="text-left">
                <span className="text-brand-purple font-bold text-3xl">
                  {displayPrice} {CURRENCY}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;
