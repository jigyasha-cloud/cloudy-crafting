import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-card bg-white/95 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-[#B9D8E1] max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EAF4F8] text-[#142C37] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 border-b border-[#B9D8E1] pb-3 mb-4">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h3 className="text-xl font-serif font-bold text-[#142C37]">
              Your Saved Favorites ({wishlistProducts.length})
            </h3>
          </div>

          {wishlistProducts.length > 0 ? (
            <div className="space-y-3">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#F0F6F9] p-3 rounded-2xl border border-[#B9D8E1] flex items-center gap-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-xl shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#142C37] truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-[#447F98]">
                      ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-[#447F98] text-white p-2 rounded-full hover:bg-[#386D82] cursor-pointer"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="text-rose-600 p-2 rounded-full hover:bg-rose-100 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 space-y-2">
              <Heart className="w-10 h-10 text-[#629BB5] mx-auto" />
              <p className="font-serif font-bold text-[#142C37]">No saved items yet</p>
              <p className="text-xs text-[#5C7C8B]">
                Click the heart icon on any coaster, tray or clock to save it for later.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
