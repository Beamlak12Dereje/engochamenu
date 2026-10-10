import React, { useState } from 'react';
import { MapPin, Clock, Phone, MessageSquare, Send } from 'lucide-react';

const ContactSection = () => {
  const [suggestion, setSuggestion] = useState('');
  const maxChars = 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission
    console.log('Suggestion:', suggestion);
    setSuggestion('');
  };

  return (
    <section id="contact" className="min-h-screen py-16 px-4 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      />
      
      {/* Blue Overlay - 80% transparent */}
      <div className="absolute inset-0 -z-10 bg-brand-blue/80" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Location Card */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
            <div className="w-12 h-12 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-brand-yellow" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Location</h3>
            <p className="text-white/80 text-sm">
              Wello Sefer, Next to Garad Mall
            </p>
          </div>

          {/* Hours Card */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
            <div className="w-12 h-12 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-brand-yellow" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Hours</h3>
            <p className="text-white/80 text-sm">
              Mon-Sun: 6:00 AM - 12:00 AM
            </p>
          </div>

          {/* Order Card */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
            <div className="w-12 h-12 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-brand-yellow" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Order</h3>
            <p className="text-white/80 text-sm">
              (+251) 987 222 226
            </p>
            <p className="text-white/80 text-sm">
              (+251) 985 222 254
            </p>
          </div>
        </div>

        {/* Suggestion Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            {/* Icon */}
            <div className="w-12 h-12 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="text-brand-yellow" size={24} />
            </div>

            {/* Title */}
            <h2 className="text-white font-bold text-2xl md:text-3xl text-center mb-3">
              Share Your Suggestions
            </h2>
            <p className="text-white/70 text-center mb-6">
              Help us improve! We'd love to hear your thoughts, ideas, or feedback about our food, service, or anything else.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value.slice(0, maxChars))}
                placeholder="Share your thoughts, suggestions, or feedback with us..."
                className="w-full bg-black/20 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-brand-yellow transition-colors resize-none"
                rows="6"
                maxLength={maxChars}
              />
              
              {/* Character count */}
              <div className="flex justify-between items-center mt-2 mb-4">
                <p className="text-white/60 text-sm">
                  Your feedback helps us serve you better
                </p>
                <p className="text-white/60 text-sm">
                  {suggestion.length}/{maxChars}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-purple font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Submit Suggestion
              </button>
            </form>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-16 pt-12 border-t border-white/20">
          {/* Restaurant Name */}
          <h2 className="text-white font-extrabold text-3xl text-center mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            ENGOCHA
          </h2>
          <p className="text-white/80 text-center mb-8">
            Follow us and Be first to taste what's new
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center gap-8 mb-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-yellow transition-colors font-bold text-lg"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-yellow transition-colors font-bold text-lg"
            >
              Facebook
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-yellow transition-colors font-bold text-lg"
            >
              Tiktok
            </a>
          </div>


        </div>
      </div>
    </section>
  );
};

export default ContactSection;
