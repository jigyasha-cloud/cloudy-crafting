import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageSquare, Sparkles, Calendar, Paintbrush } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string; // default e.g. "919289280613"
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '919289280613',
  defaultMessage = "Hi Cloudy_crafting! I'm interested in your handcrafted resin artwork and bespoke pieces.",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const formattedPhone = phoneNumber.replace(/[^0-9]/g, '');

  const openWhatsApp = (msgText?: string) => {
    const textToSend = msgText || customMessage.trim() || defaultMessage;
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const quickPrompts = [
    {
      icon: Paintbrush,
      label: "🎨 Custom Resin Order Inquiry",
      text: "Hi Cloudy_crafting! I'd like to get a quote for a custom resin commission from cloud9_celebrations.",
    },
    {
      icon: Sparkles,
      label: "🌸 Wedding Flower Preservation",
      text: "Hi Cloudy_crafting! I would like to inquire about preserving my wedding/memorial flowers in resin.",
    },
    {
      icon: Sparkles,
      label: "✨ Product Details & Shipping",
      text: "Hi! I'd like to ask about product availability and shipping timelines.",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Interactive Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto w-[320px] sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-[#25D366]/30 overflow-hidden mb-3 text-left"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center font-serif font-bold text-sm text-white">
                    CL
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075E54]"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-xs leading-tight text-white flex items-center gap-1.5">
                    <span>Cloudy_crafting</span>
                    <span className="text-[9px] bg-[#25D366] text-white px-1.5 py-0.2 rounded-md font-sans">Official</span>
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close WhatsApp chat popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body Canvas */}
            <div className="p-4 bg-[#ECE5DD] bg-opacity-40 space-y-3 max-h-[320px] overflow-y-auto">
              
              {/* Automated Greeting Bubble */}
              <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs text-xs text-[#2D0F17] leading-relaxed max-w-[88%] border border-black/5">
                <p className="font-semibold text-[#075E54] text-[11px] mb-1">cloud9_celebrations Studio 👋</p>
                Hello! Welcome to Cloudy_crafting. How can we help you with our handcrafted resin art or bespoke commissions today?
                <span className="block text-[9px] text-gray-400 text-right mt-1">Just now</span>
              </div>

              {/* Quick Select Buttons */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-1">Quick Options:</p>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => openWhatsApp(prompt.text)}
                    className="w-full text-left bg-white hover:bg-[#F8ECE9] border border-[#E8C5C8]/80 p-2.5 rounded-xl text-xs font-medium text-[#4A1E29] transition-all flex items-center gap-2 shadow-2xs hover:shadow-xs group cursor-pointer"
                  >
                    <span className="text-xs">{prompt.label}</span>
                  </button>
                ))}
              </div>

              {/* Custom Message Input */}
              <div className="pt-2">
                <div className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-1.5 pl-3 shadow-inner">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && openWhatsApp()}
                    className="w-full text-xs text-gray-800 focus:outline-none bg-transparent"
                  />
                  <button
                    onClick={() => openWhatsApp()}
                    className="w-8 h-8 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs"
                    title="Send message to WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Footer Direct Launcher Button */}
            <div className="p-3 bg-white border-t border-gray-100 text-center">
              <button
                onClick={() => openWhatsApp()}
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {/* SVG WhatsApp Logo */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Start Direct Chat on WhatsApp</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <div className="relative pointer-events-auto flex items-center gap-2 group">
        
        {/* Hover Label Badge */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-1.5 bg-white text-[#075E54] text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-[#25D366]/40 text-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span>Chat on WhatsApp</span>
          </motion.div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
          title="Direct WhatsApp Support"
          aria-label="Direct WhatsApp Support"
        >
          {/* Pulsing ring background */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>

          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          )}
        </button>

      </div>

    </div>
  );
};
