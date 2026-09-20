import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (discountAmount: number, promoApplied: boolean) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const subtotal = cartItems.reduce((sum, item) => {
    const unitPrice = item.product.salePrice || item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const discountAmount = promoApplied ? subtotal * 0.2 : 0; // 20% off
  const finalTotal = subtotal - discountAmount;

  // Free shipping threshold
  const freeShippingGoal = 1999;
  const progressPercent = Math.min(100, (subtotal / freeShippingGoal) * 100);
  const amountNeeded = Math.max(0, freeShippingGoal - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SPRING20') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "SPRING20" for 20% off!');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-xs"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md glass-drawer p-6 flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#B9D8E1]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#447F98]" />
                  <h3 className="font-serif font-bold text-xl text-[#142C37]">
                    Your Resin Bag
                  </h3>
                  <span className="bg-[#447F98] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/60 text-[#142C37]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="bg-white/70 p-3.5 rounded-2xl border border-white my-4 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[#142C37]">
                  {amountNeeded > 0 ? (
                    <span>Add <strong className="text-[#447F98]">₹{amountNeeded.toLocaleString('en-IN')}</strong> for FREE Glass-Safe Shipping</span>
                  ) : (
                    <span className="text-emerald-700 flex items-center gap-1 font-bold">
                      ✨ You've Unlocked FREE Insured Shipping!
                    </span>
                  )}
                </div>
                <div className="w-full h-2 bg-[#B9D8E1]/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#447F98] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Item List */}
              {cartItems.length > 0 ? (
                <div className="space-y-3.5 max-h-[45vh] overflow-y-auto pr-1">
                  {cartItems.map((item) => {
                    const price = item.product.salePrice || item.product.price;
                    return (
                      <div
                        key={item.id}
                        className="bg-white/80 p-3 rounded-2xl border border-white flex gap-3 items-center shadow-xs"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl shrink-0 bg-[#F0F6F9]"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-sm text-[#142C37] truncate">
                            {item.product.name}
                          </h4>
                          {item.selectedFoil && (
                            <p className="text-[11px] text-[#5C7C8B]">
                              Foil: {item.selectedFoil}
                            </p>
                          )}
                          {item.customEngraving && (
                            <p className="text-[11px] text-[#5C7C8B] italic truncate">
                              "{item.customEngraving}"
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-[#B9D8E1] rounded-full overflow-hidden bg-white">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="px-2 py-0.5 text-xs font-bold text-[#142C37]"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-bold text-[#142C37]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="px-2 py-0.5 text-xs font-bold text-[#142C37]"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-serif font-bold text-sm text-[#142C37]">
                              ₹{(price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 rounded-full hover:bg-rose-100 text-rose-700 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#B9D8E1]/40 text-[#447F98] flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="font-serif text-[#142C37] font-bold text-lg">
                    Your bag is empty
                  </p>
                  <p className="text-xs text-[#5C7C8B]">
                    Explore our coasters, geode trays, clocks, or custom keepsakes.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-[#B9D8E1] space-y-3">
                
                {/* Promo code form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (Try SPRING20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-white border border-[#B9D8E1] rounded-full px-3.5 py-1.5 text-xs text-[#142C37] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#447F98] text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-[#386D82] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoError && <p className="text-[11px] text-rose-600">{promoError}</p>}
                {promoApplied && (
                  <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <Tag className="w-3 h-3" /> 20% Spring Discount Applied!
                  </p>
                )}

                {/* Subtotal */}
                <div className="space-y-1.5 text-xs text-[#3A6070]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount (20%)</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{amountNeeded === 0 ? 'FREE' : '₹150'}</span>
                  </div>
                  <div className="flex justify-between font-serif text-base font-bold text-[#142C37] pt-2 border-t border-[#B9D8E1]">
                    <span>Total</span>
                    <span>₹{(finalTotal + (amountNeeded === 0 ? 0 : 150)).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => onProceedToCheckout(discountAmount, promoApplied)}
                  className="w-full bg-[#447F98] hover:bg-[#386D82] text-white text-xs font-semibold py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Proceed to Glass-Safe Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#5C7C8B] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#447F98]" />
                  <span>256-Bit SSL Encrypted • Handled with Studio Care</span>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
