import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ShieldCheck, CreditCard, Lock, Sparkles, Package } from 'lucide-react';
import { CartItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  onOrderCompleted,
}) => {
  const { user } = useAuth();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [fullName, setFullName] = useState(user?.name || 'Jigyasha B.');
  const [email, setEmail] = useState(user?.email || 'customer@example.com');
  const [address, setAddress] = useState('Main Road, Near Nehru Park');
  const [city, setCity] = useState('Akola, Maharashtra');
  const [zip, setZip] = useState('444001');

  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!isOpen) return null;
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('123');
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => {
    const unitPrice = item.product.salePrice || item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);
  const shippingFee = subtotal >= 1999 ? 0 : 150;
  const totalAmount = subtotal - discountAmount + shippingFee;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = 'C9-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setStep('confirmation');
  };

  const handleFinish = () => {
    onOrderCompleted();
    onClose();
    setStep('shipping');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-card bg-white/95 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-[#B9D8E1] max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EAF4F8] text-[#142C37]"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'confirmation' ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-bold">
                ✓
              </div>
              <span className="inline-flex items-center gap-1.5 bg-[#D6EBF3] text-[#447F98] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#B9D8E1]">
                <Sparkles className="w-3.5 h-3.5" /> Order Confirmed
              </span>
              <h3 className="text-2xl font-serif text-[#142C37] font-bold">
                Thank You For Your Order!
              </h3>
              <p className="text-xs text-[#5C7C8B]">
                Order Reference: <strong className="text-[#447F98]">{orderId}</strong>
              </p>

              {/* Summary Box */}
              <div className="bg-[#F0F6F9] p-4 rounded-2xl border border-[#B9D8E1] text-left text-xs space-y-2">
                <div className="flex justify-between font-bold text-[#142C37] pb-2 border-b border-[#B9D8E1]">
                  <span>Shipping To:</span>
                  <span>{fullName} • {city}</span>
                </div>
                <div className="space-y-1 pt-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-[#3A6070]">
                      <span>
                        {item.quantity}x {item.product.name}
                      </span>
                      <span>
                        ₹{((item.product.salePrice || item.product.price) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#B9D8E1] flex justify-between font-serif text-sm font-bold text-[#142C37]">
                  <span>Paid Total:</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="text-[11px] text-[#5C7C8B]">
                Each piece will be inspected, polished, and packaged in custom glass-safe cushioned boxing. Tracking info will be sent to <strong>{email}</strong>.
              </p>

              <button
                onClick={handleFinish}
                className="w-full bg-[#447F98] text-white text-xs font-semibold py-3 rounded-full hover:bg-[#386D82] transition-all cursor-pointer shadow-md"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-b border-[#B9D8E1] pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#447F98] tracking-wider">
                    Step {step === 'shipping' ? '1 of 2: Shipping Details' : '2 of 2: Payment'}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#142C37]">
                    Glass-Safe Checkout
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-serif text-lg font-bold text-[#447F98]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {step === 'shipping' ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email for Tracking Receipt"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Postal Code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="w-full bg-[#447F98] hover:bg-[#386D82] text-white text-xs font-semibold py-3 rounded-full transition-all shadow-md mt-2 cursor-pointer"
                  >
                    Continue to Payment
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCompleteOrder} className="space-y-3">
                  <div className="bg-[#F0F6F9] p-3 rounded-2xl border border-[#B9D8E1] flex items-center justify-between text-xs text-[#142C37]">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#447F98]" />
                      <span>Encrypted Payment Card</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold">256-Bit SSL</span>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37] focus:outline-none"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2 text-xs text-[#142C37]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="w-1/3 bg-white border border-[#B9D8E1] text-[#142C37] text-xs font-semibold py-3 rounded-full hover:bg-[#EAF4F8] cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-[#447F98] hover:bg-[#386D82] text-white text-xs font-semibold py-3 rounded-full transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Pay ₹{totalAmount.toLocaleString('en-IN')}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
