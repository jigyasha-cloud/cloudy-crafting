import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Tag } from 'lucide-react';
import trayImg from '../assets/images/product-6.jfif';

interface PromoBannerSectionProps {
  onShopSaleClick: () => void;
}

export const PromoBannerSection: React.FC<PromoBannerSectionProps> = ({
  onShopSaleClick,
}) => {
  return (
    <section className="py-6 sm:py-8 bg-gradient-to-r from-[#B9D8E1] via-[#D6EBF3] to-[#B9D8E1] relative overflow-hidden">
      
      {/* Soft overlay patterns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 items-center">
          
          {/* Left Text Block */}
          <div className="text-left space-y-2 sm:space-y-3 max-w-lg">
            <div className="inline-flex items-center gap-1.5 bg-white/80 border border-white text-[#447F98] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-2xs">
              <Tag className="w-3 h-3 text-[#447F98]" />
              <span>Limited Season Offer</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-[#142C37] tracking-tight leading-tight">
              Handcrafted gift Hampers <br />
              <span className="text-[#447F98]">Up to 30% OFF</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#3A6070] leading-relaxed">
              Fresh pours. Chocolates & flowers. Handcrafted artwork that brings coastal serenity to your home. Explore limited edition rakhi, bouquet, and custom flower preservation kits.
            </p>

            <div className="pt-1">
              <button
                onClick={onShopSaleClick}
                className="bg-[#447F98] hover:bg-[#386D82] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-2 group"
              >
                <span>Shop Sale Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Image Frame */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-md border-2 sm:border-4 border-white aspect-[16/10] max-h-56 sm:max-h-64 max-w-sm sm:max-w-md mx-auto md:max-w-none w-full"
          >
            <img
              src={trayImg}
              alt="Resin Art Special Sale Piece"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute top-3 right-3 bg-white/95 text-[#447F98] font-serif font-bold text-xs px-3 py-1 rounded-full shadow-sm border border-[#B9D8E1]">
              SAVE 30% NOW
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
