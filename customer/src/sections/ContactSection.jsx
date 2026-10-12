import React, { useState } from 'react';
import { MapPin, Clock, Phone, MessageSquare, Send } from 'lucide-react';
import { sendSuggestion } from '../api/menuApi';

const ContactSection = () => {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const maxChars = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!suggestion.trim()) {
      setError('Please enter a message');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      await sendSuggestion({ message: suggestion });
      setSuccess(true);
      setSuggestion('');
      
      // Hide success message after 60 seconds (1 minute)
      setTimeout(() => setSuccess(false), 60000);
    } catch (err) {
      setError(err.message || 'Failed to send suggestion');
    } finally {
      setLoading(false);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          {/* Location Card */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 text-center border border-white/10">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto mb-1.5 md:mb-2" style={{ backgroundColor: '#FFF9E6' }}>
              <MapPin className="text-brand-purple" size={18} />
            </div>
            <h3 className="text-white font-bold text-sm md:text-base mb-0.5 md:mb-1">Location</h3>
            <p className="text-white/80 text-xs">
              Meskel Square, Next to Nasa Hotel<br />
              Jinka, Ethiopia
            </p>
          </div>

          {/* Hours Card */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 text-center border border-white/10">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto mb-1.5 md:mb-2" style={{ backgroundColor: '#FFF9E6' }}>
              <Clock className="text-brand-purple" size={18} />
            </div>
            <h3 className="text-white font-bold text-sm md:text-base mb-0.5 md:mb-1">Hours</h3>
            <p className="text-white/80 text-xs">
               Mon - sun: 06:00 AM - 10:00 PM<br />
               Mon - sun: 12:00 AM - 4:00 PM Local Time
            </p>
          </div>

          {/* Order Card */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 text-center border border-white/10">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto mb-1.5 md:mb-2" style={{ backgroundColor: '#FFF9E6' }}>
              <Phone className="text-brand-purple" size={18} />
            </div>
            <h3 className="text-white font-bold text-sm md:text-base mb-0.5 md:mb-1">Order</h3>
            <p className="text-white/80 text-xs">
               +251 939 131 846
         
            </p>
            <p className="text-white/80 text-xs">
               +251 912 799 716
            </p>
          </div>
        </div>

        {/* Suggestion Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 border border-white/10">
            {/* Icon */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4" style={{ backgroundColor: '#FFF9E6' }}>
              <MessageSquare className="text-brand-purple" size={18} />
            </div>

            {/* Title */}
            <h2 className="text-white font-bold text-lg md:text-xl lg:text-2xl text-center mb-1.5 md:mb-2">
              Share Your Suggestions
            </h2>
            <p className="text-white/70 text-center text-xs md:text-sm mb-3 md:mb-4">
              Help us improve! We'd love to hear your thoughts, ideas, or feedback about our food, service, or anything else.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value.slice(0, maxChars))}
                placeholder="Share your thoughts, suggestions, or feedback with us..."
                className="w-full bg-black/20 border border-white/20 rounded-lg md:rounded-xl p-2.5 md:p-3 text-white text-xs md:text-sm placeholder-white/50 focus:outline-none focus:border-brand-yellow transition-colors resize-none"
                rows="3"
                maxLength={maxChars}
              />
              
              {/* Character count */}
              <div className="flex justify-between items-center mt-1.5 md:mt-2 mb-2 md:mb-3">
                <p className="text-white/60 text-xs">
                  Your feedback helps us serve you better
                </p>
                <p className="text-white/60 text-xs">
                  {suggestion.length}/{maxChars}
                </p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-2 md:mb-3 p-4 md:p-5 rounded-xl text-center shadow-lg border-2" style={{ backgroundColor: '#FFF9E6', borderColor: '#F9A809' }}>
                  <div className="text-2xl md:text-3xl mb-2">✓</div>
                  <p className="text-brand-purple font-bold text-sm md:text-base">Thank you for your suggestion!</p>
                  <p className="text-brand-purple/80 font-bold text-xs md:text-sm mt-1">We appreciate your feedback</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-2 md:mb-3 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-xs text-center">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-brand-purple font-bold py-2 md:py-2.5 px-4 md:px-5 rounded-lg md:rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
                style={{ backgroundColor: '#FFF9E6' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#FFF4CC'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FFF9E6'}
              >
                <Send size={14} className="md:hidden" />
                <Send size={16} className="hidden md:block" />
                {loading ? 'Sending...' : 'Submit Suggestion'}
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
              href="https://www.instagram.com/engochacaferestaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-yellow transition-colors font-bold text-lg"
            >
              Instagram
            </a>
            <a
              href="https://web.facebook.com/engochacaferestaurant/?_rdc=1&_rdr#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-yellow transition-colors font-bold text-lg"
            >
              Facebook
            </a>
           
          </div>


        </div>
      </div>
    </section>
  );
};

export default ContactSection;
