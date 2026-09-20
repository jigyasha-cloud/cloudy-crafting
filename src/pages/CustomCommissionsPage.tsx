import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flower2, Heart, CheckCircle2, Shield, Calendar } from 'lucide-react';
import { CustomOrderModal } from '../components/CustomOrderModal';

interface CustomCommissionsPageProps {
  onCustomOrderSuccess: (req: any) => void;
}

export const CustomCommissionsPage: React.FC<CustomCommissionsPageProps> = ({ onCustomOrderSuccess }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#447F98] bg-[#D6EBF3] border border-[#B9D8E1] px-3 py-1 rounded-full">
          Customised gifts hamper store
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#142C37] mt-3">
          Custom handcrafted art like bouquet, hampers, flowers!
        </h1>
        <p className="text-sm text-[#5C7C8B] mt-4 leading-relaxed">
          Transform your cherished bridal bouquet, memory flowers, or custom color palette into a permanent 3D crystal resin artwork that lasts a lifetime.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white/90 border border-[#B9D8E1] rounded-3xl p-8 shadow-sm text-center flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-[#D6EBF3] text-[#447F98] flex items-center justify-center mx-auto mb-4 border border-[#B9D8E1]">
              <Flower2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#142C37]">Bridal Bouquet Blocks</h3>
            <p className="text-xs text-[#5C7C8B] mt-2 leading-relaxed">
              custom flower bouquet and handmade gift hampers
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 w-full py-2.5 bg-[#447F98] hover:bg-[#386D82] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            Crochet Flowers
          </button>
        </div>

        <div className="bg-white/90 border border-[#B9D8E1] rounded-3xl p-8 shadow-sm text-center flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-[#D6EBF3] text-[#447F98] flex items-center justify-center mx-auto mb-4 border border-[#B9D8E1]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#142C37]">Custom crochet bouquet</h3>
            <p className="text-xs text-[#5C7C8B] mt-2 leading-relaxed">
              Amazing crochet flower bouquet, keychain nd more.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 w-full py-2.5 bg-[#447F98] hover:bg-[#386D82] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            Handcrafted decorates
          </button>
        </div>

        <div className="bg-white/90 border border-[#B9D8E1] rounded-3xl p-8 shadow-sm text-center flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-[#D6EBF3] text-[#447F98] flex items-center justify-center mx-auto mb-4 border border-[#B9D8E1]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#142C37]">Corporate & Wedding Favors</h3>
            <p className="text-xs text-[#5C7C8B] mt-2 leading-relaxed">
              Bulk customized things
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 w-full py-2.5 bg-[#447F98] hover:bg-[#386D82] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            Bulk Inquiry
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-[#EAF4F8]/70 rounded-3xl p-8 sm:p-12 border border-[#B9D8E1]">
        <h2 className="text-2xl font-serif font-bold text-[#142C37] text-center mb-8">
          The Bespoke Process
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#447F98] text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">1</div>
            <h4 className="font-serif font-bold text-[#142C37] text-sm">Submit Request</h4>
            <p className="text-xs text-[#5C7C8B] mt-1">Fill out dimensions, color choices, or flower type.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-[#447F98] text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">2</div>
            <h4 className="font-serif font-bold text-[#142C37] text-sm">Design Consult</h4>
            <p className="text-xs text-[#5C7C8B] mt-1">Receive a custom quote and design mockups.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-[#447F98] text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">3</div>
            <h4 className="font-serif font-bold text-[#142C37] text-sm">Studio Handcraft</h4>
            <p className="text-xs text-[#5C7C8B] mt-1">Slow multi-layer pouring and precision polishing.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-[#447F98] text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">4</div>
            <h4 className="font-serif font-bold text-[#142C37] text-sm">Insured Delivery</h4>
            <p className="text-xs text-[#5C7C8B] mt-1">Shipped in protective gift packing.</p>
          </div>
        </div>
      </div>

      <CustomOrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitSuccess={onCustomOrderSuccess}
      />
    </div>
  );
};
