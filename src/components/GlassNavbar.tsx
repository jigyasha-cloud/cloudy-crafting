import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Search, X, Sparkles, Calendar, Instagram, Facebook, Info, Mail, User as UserIcon, LogOut, LogIn, ChevronDown, Package } from 'lucide-react';
import { ProductCategory } from '../types';
import { useAuth } from '../context/AuthContext';

interface GlassNavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
  activeCategory: ProductCategory;
  onOpenCustomModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  activeCategory,
  onOpenCustomModal,
  searchQuery,
  setSearchQuery,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const { user, openAuthModal, setMyOrdersModalOpen, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryNavigate = (cat: ProductCategory) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    navigate(`/shop?category=${cat}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setMobileMenuOpen(false);
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Floating Glassmorphic Top Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-2.5 sm:px-4 md:px-6 lg:px-8 ${
          isScrolled ? 'py-1.5 sm:py-2.5' : 'py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="glass-nav rounded-full px-2.5 sm:px-5 md:px-6 py-1.5 sm:py-2.5 flex items-center justify-between transition-all duration-300 shadow-md bg-white/85 backdrop-blur-md border border-white/90 gap-1.5 sm:gap-4">
            
            {/* Left: Brand Logo & Script Typography */}
            <Link
              to="/"
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group flex items-center gap-1.5 sm:gap-2.5 focus:outline-none shrink"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#B9D8E1]/40 flex items-center justify-center border border-[#629BB5]/40 text-[#447F98] font-serif font-bold text-[9px] sm:text-xs group-hover:scale-105 transition-transform shrink-0">
                CL
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif font-bold text-sm xs:text-base sm:text-xl text-[#142C37] leading-none tracking-tight whitespace-nowrap">
                  Cloudy_crafting
                </span>
              </div>
            </Link>

            {/* Middle: Desktop Navigation Links (Evenly Spaced) */}
            <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 text-xs font-semibold tracking-wider uppercase text-[#224453] shrink-0">
              <Link
                to="/"
                onClick={() => {
                  onSelectCategory('all');
                  setSearchQuery('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  location.pathname === '/'
                    ? 'bg-[#447F98] text-white shadow-xs'
                    : 'hover:bg-[#EAF3F7] hover:text-[#142C37]'
                }`}
              >
                Home
              </Link>

              {/* Shop All with hover dropdown */}
              <div className="relative group">
                <Link
                  to="/shop"
                  onClick={() => {
                    onSelectCategory('all');
                    setSearchQuery('');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1 whitespace-nowrap ${
                    location.pathname === '/shop'
                      ? 'bg-[#447F98] text-white shadow-xs'
                      : 'hover:bg-[#EAF3F7] hover:text-[#142C37]'
                  }`}
                >
                  <span>Shop All</span>
                </Link>

                {/* Submenu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50 min-w-[200px]">
                  <div className="bg-white/95 backdrop-blur-xl border border-[#B9D8E1] rounded-2xl p-2 shadow-xl space-y-1">
                    <button
                      onClick={() => handleCategoryNavigate('flower')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#142C37] hover:bg-[#EAF4F8] hover:text-[#447F98] transition-colors flex items-center justify-between"
                    >
                      <span>FLower</span>
                      <span className="text-[10px] text-[#447F98]">Ocean Wave</span>
                    </button>
                    <button
                      onClick={() => handleCategoryNavigate('gifts hamper')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#142C37] hover:bg-[#EAF4F8] hover:text-[#447F98] transition-colors flex items-center justify-between"
                    >
                      <span>Hampers</span>
                      <span className="text-[10px] text-[#447F98]">Crushed Crystal</span>
                    </button>
                    <button
                      onClick={() => handleCategoryNavigate('valentines gift')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#142C37] hover:bg-[#EAF4F8] hover:text-[#447F98] transition-colors flex items-center justify-between"
                    >
                      <span>Valentine gift</span>
                      <span className="text-[10px] text-[#447F98]">Silent Sweep</span>
                    </button>
                    <button
                      onClick={() => handleCategoryNavigate('nails extension')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#142C37] hover:bg-[#EAF4F8] hover:text-[#447F98] transition-colors flex items-center justify-between"
                    >
                      <span>Nail Extensions</span>
                      <span className="text-[10px] text-[#447F98]">Preserved Botanicals</span>
                    </button>
                    <button
                      onClick={() => handleCategoryNavigate('bouquet')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#142C37] hover:bg-[#EAF4F8] hover:text-[#447F98] transition-colors flex items-center justify-between"
                    >
                      <span>Bouquet</span>
                      <span className="text-[10px] text-[#447F98]">Beginner Ready</span>
                    </button>
                  </div>
                </div>
              </div>

              <Link
                to="/custom-commissions"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  location.pathname === '/custom-commissions'
                    ? 'bg-[#447F98] text-white shadow-xs'
                    : 'hover:bg-[#EAF3F7] hover:text-[#142C37]'
                }`}
              >
                Custom Order
              </Link>

              {/* Instagram Reels link */}
              <a
                href="/#social-feed"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('social-feed')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#social-feed');
                  }
                }}
                className="px-3 py-1.5 rounded-full transition-all flex items-center gap-1 whitespace-nowrap hover:bg-[#EAF3F7] hover:text-[#142C37] text-[#447F98]"
              >
                <Instagram className="w-3 h-3 text-[#447F98]" />
                <span>Reels</span>
              </a>

              <Link
                to="/about"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  location.pathname === '/about'
                    ? 'bg-[#447F98] text-white shadow-xs'
                    : 'hover:bg-[#EAF3F7] hover:text-[#142C37]'
                }`}
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  location.pathname === '/contact'
                    ? 'bg-[#447F98] text-white shadow-xs'
                    : 'hover:bg-[#EAF3F7] hover:text-[#142C37]'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Right: Search, User, Wishlist, Cart & Mobile Menu Toggle */}
            <div className="flex items-center space-x-0.5 xs:space-x-1 sm:space-x-2 shrink-0">
              
              {/* Search Toggle */}
              <div className="relative">
                <AnimatePresence>
                  {searchOpen && (
                    <form
                      onSubmit={handleSearchSubmit}
                      className="absolute right-full mr-1 top-0 bottom-0 flex items-center z-10"
                    >
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                        className="w-24 xs:w-32 sm:w-44 bg-white/95 border border-[#B9D8E1] text-[11px] sm:text-xs px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#447F98] text-[#142C37] shadow-sm"
                      />
                    </form>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-1 sm:p-2 rounded-full hover:bg-[#EAF3F7] text-[#224453] transition-all"
                  title="Search products"
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* User Account / Sign In Control */}
              <div className="relative">
                {user ? (
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1 p-0.5 sm:px-2.5 sm:py-1 rounded-full hover:bg-[#EAF3F7] border border-[#B9D8E1] bg-white/70 text-[#224453] transition-all"
                    title="Account Options"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#447F98] text-white flex items-center justify-center font-bold text-[10px] sm:text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden md:inline text-xs font-semibold max-w-[80px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#447F98] hidden xs:inline" />
                  </button>
                ) : (
                  <button
                    onClick={() => openAuthModal('login')}
                    className="flex items-center gap-1 p-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-[#EAF3F7] text-[#224453] text-xs font-semibold transition-all border border-transparent hover:border-[#B9D8E1]"
                    title="Sign In / Register"
                  >
                    <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#447F98]" />
                    <span className="hidden sm:inline">Sign In</span>
                  </button>
                )}

                {/* User Dropdown Menu */}
                {user && userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-52 sm:w-56 bg-white/95 backdrop-blur-xl border border-[#B9D8E1] rounded-2xl shadow-xl p-2 z-50 text-xs">
                      <div className="p-2 border-b border-[#DADEE1] mb-1">
                        <p className="font-bold text-[#142C37] truncate">{user.name}</p>
                        <p className="text-[10px] text-[#5C7C8B] truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setMyOrdersModalOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-[#142C37] hover:bg-[#EAF4F8] hover:text-[#447F98] font-medium transition-colors flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Package className="w-3.5 h-3.5 text-[#447F98]" />
                          <span>My Orders & Passes</span>
                        </span>
                        <span className="bg-[#447F98]/10 text-[#447F98] text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                          VIP
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-rose-700 hover:bg-rose-50 font-medium transition-colors flex items-center gap-2 mt-1 border-t border-[#DADEE1]/60 pt-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Wishlist Icon */}
              <button
                onClick={onOpenWishlist}
                className="p-1 sm:p-2 rounded-full hover:bg-[#EAF3F7] text-[#224453] transition-all relative"
                title="View Favorites"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#447F98] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="flex items-center space-x-1 bg-[#447F98] hover:bg-[#386D82] text-white px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all shadow-xs text-xs font-semibold tracking-wider uppercase"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden xs:inline text-[11px] sm:text-xs">Bag</span>
                <span className="bg-white/25 text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                  {cartCount}
                </span>
              </button>

              {/* Mobile / Tablet Menu Toggle */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1 sm:p-2 rounded-full text-[#224453] hover:bg-[#EAF3F7] focus:outline-none transition-all flex items-center justify-center border border-[#B9D8E1] bg-white/70"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-4 h-4 text-[#224453]" />
                  ) : (
                    <div className="w-3.5 h-3 sm:w-4 sm:h-3.5 flex flex-col justify-between items-center py-0.5">
                      <span className="w-3.5 sm:w-4 h-[2px] bg-[#224453] rounded-full"></span>
                      <span className="w-3.5 sm:w-4 h-[2px] bg-[#224453] rounded-full"></span>
                      <span className="w-2 sm:w-2.5 h-[2px] bg-[#224453] rounded-full self-start"></span>
                    </div>
                  )}
                </button>
              </div>

            </div>
          </nav>
        </div>
      </header>

      {/* Glassmorphic Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40"
            />

            {/* Glass Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-xs z-50 glass-drawer p-6 flex flex-col justify-between overflow-y-auto bg-white/95 backdrop-blur-xl border-r border-white/80 shadow-2xl"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-[#B9D8E1]/60">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#B9D8E1]/40 flex items-center justify-center text-[#447F98] font-serif font-bold text-[10px] shrink-0">
                      CL
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-serif font-bold text-base text-[#142C37] leading-none">
                        Cloudy_crafting
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-black/5 text-[#224453]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search in Drawer */}
                <form onSubmit={handleSearchSubmit} className="my-5">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#629BB5]" />
                    <input
                      type="text"
                      placeholder="Search collection..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#EAF4F8] border border-[#B9D8E1] rounded-full pl-9 pr-4 py-2 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
                    />
                  </div>
                </form>

                {/* Nav Links */}
                <div className="space-y-1 my-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#629BB5] mb-3 px-2">
                    Navigation
                  </p>
                  
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EAF4F8] text-[#142C37] font-medium text-xs tracking-wider uppercase block"
                  >
                    Home
                  </Link>

                  <Link
                    to="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EAF4F8] text-[#142C37] font-medium text-xs tracking-wider uppercase flex items-center justify-between"
                  >
                    <span>Shop All Collection</span>
                    <span className="text-[10px] text-[#447F98] bg-[#D6EBF3] px-2 py-0.5 rounded-full font-bold">Catalog</span>
                  </Link>

                  <button
                    onClick={() => handleCategoryNavigate('flower')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EAF4F8] text-[#142C37] font-medium text-xs tracking-wider uppercase"
                  >
                    Flowers
                  </button>

                  <button
                    onClick={() => handleCategoryNavigate('valentines gift')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EAF4F8] text-[#142C37] font-medium text-xs tracking-wider uppercase"
                  >
                   Valentines gifts
                  </button>

                  <button
                    onClick={() => handleCategoryNavigate('gifts hamper')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EAF4F8] text-[#142C37] font-medium text-xs tracking-wider uppercase"
                  >
                    gifts hamper
                  </button>

                  <a
                    href="/#social-feed"
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (location.pathname === '/') {
                        e.preventDefault();
                        document.getElementById('social-feed')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        navigate('/#social-feed');
                      }
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EAF4F8] text-[#447F98] font-semibold text-xs tracking-wider uppercase flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Instagram className="w-3.5 h-3.5 text-[#447F98]" />
                      Instagram Reels
                    </span>
                    <span className="text-[9px] bg-[#D6EBF3] text-[#447F98] px-2 py-0.5 rounded-full font-bold">300k+ Views</span>
                  </a>

                  <Link
                    to="/custom-commissions"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EAF4F8] text-[#142C37] font-medium text-xs tracking-wider uppercase block"
                  >
                    Bespoke Commissions
                  </Link>

                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EAF4F8] text-[#142C37] font-medium text-xs tracking-wider uppercase block"
                  >
                    About Our Studio
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EAF4F8] text-[#142C37] font-medium text-xs tracking-wider uppercase block"
                  >
                    Contact & Location
                  </Link>
                </div>

                {/* Mobile Account Section */}
                <div className="bg-[#EAF4F8]/90 border border-[#B9D8E1] p-3.5 rounded-2xl my-4">
                  {user ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#447F98] text-white flex items-center justify-center font-serif font-bold text-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-xs text-[#142C37] truncate">{user.name}</p>
                          <p className="text-[10px] text-[#5C7C8B] truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-1 border-t border-[#B9D8E1]">
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMyOrdersModalOpen(true);
                          }}
                          className="flex-1 bg-white border border-[#B9D8E1] text-[#447F98] text-[11px] font-semibold py-1.5 px-2 rounded-xl flex items-center justify-center gap-1"
                        >
                          <Package className="w-3 h-3" />
                          <span>My Orders</span>
                        </button>
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            logout();
                          }}
                          className="bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1"
                        >
                          <LogOut className="w-3 h-3" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xs text-[#142C37]">Studio Account</p>
                        <p className="text-[10px] text-[#5C7C8B]">Sign in for orders & custom inquiries</p>
                      </div>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          openAuthModal('login');
                        }}
                        className="bg-[#447F98] text-white text-xs font-semibold py-1.5 px-3 rounded-full flex items-center gap-1 shadow-xs"
                      >
                        <LogIn className="w-3 h-3" />
                        <span>Sign In</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Custom Order Box */}
                <div className="bg-[#EAF4F8] border border-[#B9D8E1] p-4 rounded-2xl my-5">
                  <h4 className="font-serif font-bold text-[#142C37] text-xs uppercase tracking-wider mb-1">
                    Custom Bouquet Preservation
                  </h4>
                  <p className="text-[11px] text-[#345362] mb-3 leading-relaxed">
                    Preserve special bridal flowers into a crystal resin tray or block.
                  </p>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/custom-commissions');
                    }}
                    className="w-full bg-[#447F98] text-white text-xs font-semibold uppercase tracking-wider py-2 rounded-full hover:bg-[#386D82] transition-all"
                  >
                    Request Quote
                  </button>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="pt-4 border-t border-[#B9D8E1]/60 text-xs text-[#345362] space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span>Studio Location:</span>
                  <span className="font-medium text-[#142C37]">Akola, Maharashtra</span>
                </div>
                <div className="flex items-center justify-center space-x-3 pt-2 text-[#447F98]">
                  <a href="#" className="p-2 bg-[#EAF4F8] rounded-full hover:bg-[#D6EBF3]"><Instagram className="w-3.5 h-3.5" /></a>
                  <a href="#" className="p-2 bg-[#EAF4F8] rounded-full hover:bg-[#D6EBF3]"><Facebook className="w-3.5 h-3.5" /></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};


