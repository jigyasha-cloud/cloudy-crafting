import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#447F98] bg-[#D6EBF3] border border-[#B9D8E1] px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#142C37] mt-3">
          Contact cloudy_crafting
        </h1>
        <p className="text-xs sm:text-sm text-[#5C7C8B] mt-2">
          Have questions about our custom handcrafted, bespoke celebration gifts, flower preservation, or luxury home decor? We'd love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div className="space-y-6 bg-white/80 p-8 rounded-3xl border border-[#B9D8E1]">
          <h3 className="text-xl font-serif font-bold text-[#142C37]">Studio Details</h3>
          
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#447F98] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase text-[#142C37]">Studio Address</h4>
              <p className="text-xs text-[#5C7C8B]">Cloudy_crafting Studio, Akola, Maharashtra 444001</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#447F98] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase text-[#142C37]">Phone & WhatsApp</h4>
              <p className="text-xs text-[#5C7C8B]">+91 9289280613</p>
            </div>
          </div>

          <a
            href="https://wa.me/919289280613?text=Hi%20Neeta!%20I'd%20like%20to%20inquire%20about%20cloud9_celebrations%20resin%20artworks%20and%20custom%20commissions."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Direct WhatsApp Chat</span>
          </a>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#447F98] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase text-[#142C37]">Email Support</h4>
              <p className="text-xs text-[#5C7C8B]">hello@cloudy_crafting.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#447F98] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase text-[#142C37]">Opening Hours</h4>
              <p className="text-xs text-[#5C7C8B]">Mon - Sat: 10:00 AM - 7:00 PM IST</p>
              <p className="text-xs text-[#5C7C8B]">Sunday: Custom Consultations by Appointment</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white/90 p-8 rounded-3xl border border-[#B9D8E1] shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-serif font-bold text-[#142C37]">Message Sent Successfully!</h3>
              <p className="text-xs text-[#5C7C8B]">Thank you for reaching out. A studio artist will respond within 24 hours.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 bg-[#447F98] hover:bg-[#386D82] text-white rounded-full text-xs font-semibold uppercase cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#142C37] mb-4">Send Us a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-[#142C37]">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1 bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-[#142C37]">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full mt-1 bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-[#142C37]">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full mt-1 bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-[#142C37]">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full mt-1 bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#447F98] hover:bg-[#386D82] text-white py-3 rounded-full font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
