import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Mail, Phone, Calendar, LogOut, Package, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserProfileModal: React.FC = () => {
  const { user, myOrdersModalOpen, setMyOrdersModalOpen, logout } = useAuth();

  if (!myOrdersModalOpen || !user) return null;

  const mockOrders = [
    {
      id: 'ORD-8821',
      date: 'Aug 10, 2026',
      items: 'Radiance Renewal Resin Coasters (Set of 4)',
      total: '₹999',
      status: 'In Transit 🚚',
    },
    {
      id: 'ORD-4402',
      date: 'Aug 05, 2026',
      items: 'HydraSilk Geode Serving Tray (Rose Gold Leaf)',
      total: '₹2,499',
      status: 'Delivered ✨',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMyOrdersModalOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-[#B9D8E1] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => setMyOrdersModalOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAF4F8] hover:bg-[#D6EBF3] text-[#142C37] flex items-center justify-center transition-all z-20 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* User Header Profile */}
          <div className="flex items-center gap-4 pb-6 border-b border-[#B9D8E1]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#142C37] via-[#447F98] to-[#629BB5] text-white flex items-center justify-center font-serif font-bold text-2xl shadow-md shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xl text-[#142C37]">{user.name}</h3>
                <span className="bg-[#D6EBF3] text-[#447F98] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#B9D8E1]">
                  Studio Member
                </span>
              </div>
              <p className="text-xs text-[#5C7C8B] mt-0.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#447F98]" />
                {user.email}
              </p>
              {user.phone && (
                <p className="text-xs text-[#5C7C8B] mt-0.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#447F98]" />
                  {user.phone}
                </p>
              )}
            </div>
          </div>

          {/* Account Overview Cards */}
          <div className="grid grid-cols-2 gap-3 my-6">
            <div className="bg-[#F0F6F9] border border-[#B9D8E1] rounded-2xl p-3.5 text-center">
              <Package className="w-5 h-5 text-[#447F98] mx-auto mb-1" />
              <div className="text-base font-serif font-bold text-[#142C37]">2</div>
              <div className="text-[11px] text-[#5C7C8B]">Active Orders</div>
            </div>
            <div className="bg-[#F0F6F9] border border-[#B9D8E1] rounded-2xl p-3.5 text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-base font-serif font-bold text-[#142C37]">Verified</div>
              <div className="text-[11px] text-[#5C7C8B]">Studio VIP Member</div>
            </div>
          </div>

          {/* Orders History */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#142C37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#447F98]" />
              <span>My Recent Orders & Commissions</span>
            </h4>

            <div className="space-y-2">
              {mockOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white border border-[#B9D8E1] rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:border-[#447F98] transition-all"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#142C37]">{ord.id}</span>
                      <span className="text-[10px] text-gray-500">• {ord.date}</span>
                    </div>
                    <p className="text-xs text-[#3A6070] font-medium">{ord.items}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-xs font-serif font-bold text-[#447F98]">{ord.total}</div>
                    <div className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5 border border-emerald-200 inline-block">
                      {ord.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sign Out / Logout Action */}
          <div className="pt-4 border-t border-[#B9D8E1] flex items-center justify-between">
            <p className="text-[11px] text-[#5C7C8B]">
              Member since {user.createdAt || '2026'}
            </p>
            <button
              onClick={logout}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
