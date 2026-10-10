import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { sendSuggestion } from '../../api/menuApi';

const SuggestionCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess(false);

    // Validate
    if (!formData.message.trim()) {
      setError('Please enter a message');
      return;
    }

    try {
      setLoading(true);
      await sendSuggestion(formData);
      setSuccess(true);
      setFormData({ name: '', message: '' }); // Reset form
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to send suggestion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-brand-blue/10 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden max-w-2xl mx-auto">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-brand-purple mb-3">
          Share your suggestion
        </h3>
        <p className="text-brand-blue/70 text-lg mb-8 font-medium">
          We value your feedback to improve our service.
        </p>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-semibold">
            ✓ Thank you for your feedback!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-semibold">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name (optional)"
            className="w-full bg-brand-yellow/10 border-2 border-brand-blue/10 rounded-2xl px-6 py-4 text-brand-blue placeholder-brand-blue/50 focus:outline-none focus:border-brand-purple focus:bg-white transition-all text-base font-medium"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            required
            className="w-full bg-brand-yellow/10 border-2 border-brand-blue/10 rounded-2xl px-6 py-4 text-brand-blue placeholder-brand-blue/50 focus:outline-none focus:border-brand-purple focus:bg-white transition-all resize-none text-base font-medium"
          ></textarea>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-purple text-white font-bold text-lg py-4 rounded-2xl hover:bg-brand-blue hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuggestionCard;
