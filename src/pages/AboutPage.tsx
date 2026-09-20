import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ShieldCheck, Award } from 'lucide-react';
import productImg from '../assets/images/product-7.jfif'

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#447F98] bg-[#D6EBF3] border border-[#B9D8E1] px-3 py-1 rounded-full">
          Our Studio Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#142C37] mt-3">
          Crafting Artist
        </h1>
        <p className="text-sm text-[#5C7C8B] mt-4 leading-relaxed">
          Founded in Akola, Maharashtra, <strong className="text-[#142C37]">Cloudy_crafting</strong> was born from a passion for bringing the soothing fluid beauty of coastal ocean tides and celebration keepsakes into functional luxury decor.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-[#B9D8E1] aspect-4/3">
          <img
            src={productImg}
            alt="Artist Crafting Resin Art"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#142C37]">
            Where Artistry Meets Craftsmanship
          </h2>
          <p className="text-sm text-[#3A6070] leading-relaxed">
            Every piece created in our studio undergoes a meticulous 72-hour curing process. We use non-toxic, natural crushed quartz, ethically harvested mica pigments, and real metallic leaf flakes.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-white/80 p-4 rounded-2xl border border-[#B9D8E1]">
              <ShieldCheck className="w-6 h-6 text-[#447F98] mb-1" />
              <h4 className="font-serif font-bold text-sm text-[#142C37]">Non-Toxic things</h4>
              <p className="text-xs text-[#5C7C8B] mt-0.5"> 100% Guarantee</p>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl border border-[#B9D8E1]">
              <Award className="w-6 h-6 text-[#447F98] mb-1" />
              <h4 className="font-serif font-bold text-sm text-[#142C37]">5,000+ Custom Pieces</h4>
              <p className="text-xs text-[#5C7C8B] mt-0.5">Handcrafted with love for homes & celebrations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
