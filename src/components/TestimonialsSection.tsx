import React from 'react';
import { motion } from 'motion/react';
import { Star, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { REVIEWS } from '../data/products';
import clockImg from '../assets/images/product-4.jfif';

interface TestimonialsSectionProps {
  onCustomClick?: () => void;
  onShopClick?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onCustomClick,
  onShopClick,
}) => {
  const featuredReview = REVIEWS[0];

  return (
    <section className="py-16 sm:py-20 bg-[#F0F6F9] border-t border-[#DADEE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Block: Loved by Thousands */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#142C37] tracking-tight mb-1">
                Loved by Thousands
              </h2>
              <p className="text-xs uppercase tracking-widest text-[#447F98] font-semibold">
                Real Collectors, Real Flow
              </p>
            </div>

            {/* Testimonial Quote Box */}
            <div className="bg-white/90 border border-[#B9D8E1] p-6 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-[#142C37] font-serif italic leading-relaxed">
                "{featuredReview.comment}"
              </p>
              <div className="pt-2 text-xs font-bold text-[#447F98] flex items-center justify-between">
                <span>— {featuredReview.author}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Purchaser
                </span>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center space-x-3 pt-2">
              <span className="text-xs text-[#5C7C8B] font-medium mr-2">Join our studio community:</span>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#447F98] text-white flex items-center justify-center hover:bg-[#386D82] transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#447F98] text-white flex items-center justify-center hover:bg-[#386D82] transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#447F98] text-white flex items-center justify-center hover:bg-[#386D82] transition-all"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#447F98] text-white flex items-center justify-center hover:bg-[#386D82] transition-all"
                title="Community Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Block: Ready to create resin art? */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/80 p-6 rounded-3xl border border-[#B9D8E1] shadow-sm">
            <div className="space-y-3 flex-1 text-left">
              <h3 className="text-2xl font-serif text-[#142C37] leading-snug">
                Ready to elevate your home with handcrafted luxury?
              </h3>
              <p className="text-xs text-[#3A6070] leading-relaxed">
                Join thousands of happy homeowners and art collectors who have added radiant resin centerpieces to their dining spaces, bedrooms, and offices.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                <button
                  onClick={onCustomClick}
                  className="bg-[#447F98] hover:bg-[#386D82] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all shadow-xs"
                >
                  Request Custom Commission
                </button>
                {onShopClick && (
                  <button
                    onClick={onShopClick}
                    className="bg-white hover:bg-[#EAF4F8] text-[#142C37] border border-[#B9D8E1] text-xs font-semibold px-4 py-2.5 rounded-full transition-all"
                  >
                    Browse Shop
                  </button>
                )}
              </div>
            </div>

            {/* Floral Resin Art Image Box */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white">
              <img
                src={clockImg}
                alt="Lotus Flower Resin Work"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
