import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Location */}
      <div className="bg-white border border-brand-purple/10 p-8 rounded-3xl flex flex-col items-center text-center hover:border-brand-purple/30 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
        <div className="bg-brand-purple/10 p-5 rounded-full mb-4 group-hover:scale-110 group-hover:bg-brand-purple/20 transition-all">
          <MapPin size={32} className="text-brand-purple" />
        </div>
        <h3 className="text-xl font-bold text-brand-blue mb-3">Location</h3>
        <p className="text-brand-blue/70 font-medium leading-relaxed">
          123 Taste Avenue<br />
          Addis Ababa, Ethiopia
        </p>
      </div>

      {/* Working Hours */}
      <div className="bg-white border border-brand-purple/10 p-8 rounded-3xl flex flex-col items-center text-center hover:border-brand-purple/30 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
        <div className="bg-brand-blue/10 p-5 rounded-full mb-4 group-hover:scale-110 group-hover:bg-brand-blue/20 transition-all">
          <Clock size={32} className="text-brand-blue" />
        </div>
        <h3 className="text-xl font-bold text-brand-blue mb-3">Working Hours</h3>
        <p className="text-brand-blue/70 font-medium leading-relaxed">
          Mon - Fri: 8:00 AM - 10:00 PM<br />
          Sat - Sun: 9:00 AM - 11:00 PM
        </p>
      </div>

      {/* Phone */}
      <div className="bg-white border border-brand-purple/10 p-8 rounded-3xl flex flex-col items-center text-center hover:border-brand-purple/30 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
        <div className="bg-brand-purple/10 p-5 rounded-full mb-4 group-hover:scale-110 group-hover:bg-brand-purple/20 transition-all">
          <Phone size={32} className="text-brand-purple" />
        </div>
        <h3 className="text-xl font-bold text-brand-blue mb-3">Phone</h3>
        <p className="text-brand-blue/70 font-medium leading-relaxed">
          +251 911 234 567<br />
          +251 987 654 321
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
