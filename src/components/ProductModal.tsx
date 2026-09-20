import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCartWithOptions: (
    product: Product,
    quantity: number,
    selectedFoil?: string,
    engraving?: string
  ) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCartWithOptions,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState('');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="glass-card bg-white/95 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-white max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EAF4F8] text-[#142C37] transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            
            {/* Left: Product Image Stage */}
            <div className="rounded-2xl overflow-hidden bg-[#F0F6F9] border border-[#B9D8E1] aspect-square flex items-center justify-center relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md border border-[#B9D8E1] px-3 py-1 rounded-full text-[11px] font-bold text-[#142C37]">
                {product.dimensions || 'Handcrafted Studio Piece'}
              </span>
            </div>

            {/* Right: Customization & Cart Options */}
            <div className="space-y-4">
              
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#447F98] bg-[#D6EBF3] border border-[#B9D8E1] px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#142C37] mt-1 leading-tight">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-xs font-bold text-[#142C37]">{product.rating}</span>
                  <span className="text-xs text-[#5C7C8B]">({product.reviewsCount} customer reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-serif font-bold text-[#447F98]">
                      ₹{product.salePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-[#5C7C8B] line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-serif font-bold text-[#142C37]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                )}
              </div>



              {/* Custom Engraving */}
              <div>
                <label className="block text-xs font-bold text-[#142C37] mb-1">
                  Custom Inscription / Engraving (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. 'Sarah & John 2026' or initials"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  maxLength={40}
                  className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3 py-1.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                />
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold text-[#142C37]">Quantity:</label>
                <div className="flex items-center border border-[#B9D8E1] rounded-full overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-xs font-bold text-[#142C37] hover:bg-[#EAF4F8]"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#142C37]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-xs font-bold text-[#142C37] hover:bg-[#EAF4F8]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                disabled={added}
                className={`w-full py-3.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#447F98] hover:bg-[#386D82] text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      Add to Bag — ₹{((product.salePrice || product.price) * quantity).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </button>

              {/* Shipping Note */}
              <div className="pt-2 text-[11px] text-[#5C7C8B] flex items-center gap-4 border-t border-[#B9D8E1]">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#447F98]" />
                  Fast Glass-Safe Delivery
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#447F98]" />
                  100% Guarantee
                </span>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
