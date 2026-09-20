import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, CheckCircle } from 'lucide-react';
import { CustomOrderRequest } from '../types';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (req: CustomOrderRequest) => void;
}

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  if (!isOpen) return null;

  const [serviceType, setServiceType] = useState<CustomOrderRequest['serviceType']>(
    'Wedding Flower Preservation'
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [colorPalette, setColorPalette] = useState('Dusty Rose, Blush Pink & Gold Leaf');
  const [budget, setBudget] = useState('₹3,000 - ₹5,000');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req: CustomOrderRequest = {
      fullName,
      email,
      phone,
      serviceType,
      colorPalette,
      budget,
      details,
    };

    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess(req);
      setSubmitted(false);
      onClose();
      setFullName('');
      setEmail('');
      setPhone('');
      setDetails('');
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-card bg-white/95 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-[#B9D8E1] max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EAF4F8] text-[#142C37] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-serif text-[#142C37] font-bold">
                Custom Inquiry Received!
              </h3>
              <p className="text-xs text-[#5C7C8B] leading-relaxed">
                Thank you! Masterartist Cloudy_crafting will review your palette and request details and reply within 24 hours with a custom mockup quote.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-[#B9D8E1] pb-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#447F98] bg-[#D6EBF3] border border-[#B9D8E1] px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" /> Bespoke Studio Request
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#142C37] mt-1">
                  Custom Handcrafted gifts hamper
                </h3>
                <p className="text-xs text-[#5C7C8B]">
                 Crochet flower bouquet, valentines gift hamper, rose bouquet.
                </p>
              </div>

              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-bold text-[#142C37] mb-1.5">
                  Type of Custom Project:
                </label>
                <select
                  value={serviceType}
                  onChange={(e) =>
                    setServiceType(e.target.value as CustomOrderRequest['serviceType'])
                  }
                  className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                >
                  <option value="Wedding Flower Preservation">
                    Wedding Invitation Card
                  </option>
                  <option value="Custom Resin Dining Tray">
                    Custom crochet flower bouquet
                  </option>
                  <option value="Geode Resin Wall Art">
                    Valentines Rose bouquet
                  </option>
                  <option value="Corporate Gift Set">
                    Gifts hamper
                  </option>
                </select>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (+91 9289280613)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                </div>
              </div>

              {/* Color Palette & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#142C37] mb-1">
                    Preferred Colors:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Glacier Blue, Turquoise & Silver Leaf"
                    value={colorPalette}
                    onChange={(e) => setColorPalette(e.target.value)}
                    className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3 py-1.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142C37] mb-1">
                    Estimated Budget:
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3 py-1.5 text-xs text-[#142C37] focus:outline-none"
                  >
                    <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
                    <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                    <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                    <option value="₹20,000+">₹20,000+ (Large Table / Wall Piece)</option>
                  </select>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-[#142C37] mb-1">
                  Project Details / Wedding Date:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your vision, dried flower type, desired dimensions or custom engraving text..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-white border border-[#B9D8E1] rounded-xl p-3 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#447F98] hover:bg-[#386D82] text-white text-xs font-semibold py-3 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Custom Request</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
