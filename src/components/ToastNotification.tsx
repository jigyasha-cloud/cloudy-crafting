import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, Heart, ShoppingBag } from 'lucide-react';

interface ToastNotificationProps {
  message: string | null;
  type?: 'cart' | 'wishlist' | 'booking' | 'custom';
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type = 'cart',
}) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 glass-nav bg-white/95 border border-[#B9D8E1] px-5 py-3.5 rounded-full shadow-xl flex items-center gap-3 text-xs font-semibold text-[#142C37]"
        >
          {type === 'cart' && <ShoppingBag className="w-4 h-4 text-[#447F98]" />}
          {type === 'wishlist' && <Heart className="w-4 h-4 text-[#447F98] fill-[#447F98]" />}
          {type === 'booking' && <Sparkles className="w-4 h-4 text-[#447F98]" />}
          {type === 'custom' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
