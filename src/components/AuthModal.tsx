import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Sparkles, LogIn, UserPlus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { authModalOpen, authMode, closeAuthModal, setAuthMode, login, signup } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 9289280613');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Status & feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  if (!authModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);
    if (!res.success && res.error) {
      setError(res.error);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service & Privacy Policy');
      return;
    }

    setLoading(true);
    const res = await signup(name, email, phone, password);
    setLoading(false);
    if (!res.success && res.error) {
      setError(res.error);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);
    setResetSent(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-[#B9D8E1] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Ambient Top Glow */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#D6EBF3]/70 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-[#B9D8E1]/50 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAF4F8] hover:bg-[#D6EBF3] text-[#142C37] flex items-center justify-center transition-all z-20 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Branding */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#D6EBF3] text-[#447F98] flex items-center justify-center mx-auto mb-3 shadow-inner border border-[#B9D8E1]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-[#142C37]">
              {authMode === 'login' && 'Welcome Back'}
              {authMode === 'signup' && 'Create Your Account'}
              {authMode === 'forgot' && 'Reset Password'}
            </h2>
            <p className="text-xs text-[#5C7C8B] mt-1">
              {authMode === 'login' && 'Sign in to access your orders, commissions & saved favorites'}
              {authMode === 'signup' && 'Join Cloudy_crafting for bespoke commission offers & updates'}
              {authMode === 'forgot' && 'Enter your email to receive a password reset link'}
            </p>
          </div>

          {/* Mode Tabs (Sign In / Sign Up) */}
          {authMode !== 'forgot' && (
            <div className="flex rounded-full bg-[#EAF4F8] p-1 border border-[#B9D8E1] mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-[#447F98] text-white shadow-xs'
                    : 'text-[#3A6070] hover:text-[#142C37]'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setError(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-[#447F98] text-white shadow-xs'
                    : 'text-[#3A6070] hover:text-[#142C37]'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl p-3 mb-4 text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* SIGN IN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#142C37] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#447F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="siya@example.com"
                    className="w-full bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#142C37]">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('forgot');
                      setError(null);
                    }}
                    className="text-[11px] text-[#447F98] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#447F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5C7C8B] hover:text-[#142C37]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#3A6070]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#B9D8E1] text-[#447F98] focus:ring-[#447F98]"
                  />
                  <span>Remember me on this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#447F98] hover:bg-[#386D82] text-white text-xs font-semibold py-3 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="animate-pulse">Signing in...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* SIGN UP FORM */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#142C37] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#447F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Siya"
                    className="w-full bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142C37] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#447F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142C37] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#447F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9289280613"
                    className="w-full bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142C37] mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#447F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5C7C8B]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer pt-1 text-xs text-[#3A6070]">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-[#B9D8E1] text-[#447F98] focus:ring-[#447F98] mt-0.5"
                />
                <span>I agree to Cloudy_crafting Terms of Service & Privacy Policy</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#447F98] hover:bg-[#386D82] text-white text-xs font-semibold py-3 rounded-full transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {loading ? (
                  <span className="animate-pulse">Creating Account...</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              {resetSent ? (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-[#142C37]">Reset Link Sent!</h3>
                  <p className="text-xs text-[#5C7C8B]">
                    We've emailed instructions to <strong>{email}</strong>. Please check your inbox.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setResetSent(false);
                    }}
                    className="text-xs font-bold text-[#447F98] hover:underline block mx-auto pt-2 cursor-pointer"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#142C37] mb-1">
                      Your Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#447F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="siya@example.com"
                        className="w-full bg-[#EAF4F8]/60 border border-[#B9D8E1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#447F98] hover:bg-[#386D82] text-white text-xs font-semibold py-3 rounded-full transition-all shadow-md cursor-pointer"
                  >
                    Send Password Reset Email
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setError(null);
                    }}
                    className="w-full text-xs font-semibold text-[#3A6070] hover:text-[#142C37] py-1 text-center cursor-pointer"
                  >
                    Cancel & Back to Sign In
                  </button>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
