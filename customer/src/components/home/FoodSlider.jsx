import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

const FoodSlider = ({ items = [] }) => {
  const [isPaused, setIsPaused] = useState(false);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Moving slide container */}
      <div className="w-full overflow-hidden py-8 md:py-12 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <div className="food-slider">
          <div className={`food-slider-track ${isPaused ? 'paused' : ''}`}>
            {/* Duplicate items for seamless loop */}
            {[...items, ...items].map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className="food-slide-item flex-shrink-0 mx-2 md:mx-3"
              >
                {/* Food card */}
                <div className="group relative flex flex-col items-center">
                  {/* Smaller circle: 2 items mobile, 8 items wide screen */}
                  <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-brand-yellow transition-all duration-300 bg-white">
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/images/fallback-food.jpg';
                      }}
                    />
                  </div>
                  {/* Item name badge */}
                  <div className="mt-1 bg-white text-brand-blue px-3 py-1 rounded-xl text-xs md:text-sm font-bold shadow-lg border border-brand-blue/10 text-center max-w-[7rem] md:max-w-[8rem] leading-tight">
                    {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pause/Play Button */}
      <div className="flex justify-center -mt-4 pb-6">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-1.5 bg-brand-blue/90 hover:bg-brand-blue text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {isPaused ? (
            <>
              <Play size={14} fill="white" />
              <span className="font-semibold text-xs md:text-sm">Play</span>
            </>
          ) : (
            <>
              <Pause size={14} />
              <span className="font-semibold text-xs md:text-sm">Pause</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FoodSlider;
