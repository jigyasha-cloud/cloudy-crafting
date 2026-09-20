/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { GlassNavbar } from './components/GlassNavbar';
import { FooterSection } from './components/FooterSection';
import { ProductModal } from './components/ProductModal';
import { CustomOrderModal } from './components/CustomOrderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { ToastNotification } from './components/ToastNotification';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { WhatsAppButton } from './components/WhatsAppButton';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomCommissionsPage } from './pages/CustomCommissionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem, FilterState, CustomOrderRequest } from './types';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cloud9_cart') || localStorage.getItem('3cs_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cloud9_wishlist') || localStorage.getItem('3cs_wishlist');
      return saved ? JSON.parse(saved) : ['p-1']; // default favorite
    } catch {
      return ['p-1'];
    }
  });

  // Category & Filter State
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    searchQuery: '',
    sortBy: 'featured',
    priceMax: 6000,
    onlyInStock: false,
    onlyOnSale: false,
  });

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'cart' | 'wishlist' | 'booking' | 'custom'>('cart');

  useEffect(() => {
    try {
      localStorage.setItem('cloud9_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('cloud9_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showToast = (msg: string, type: 'cart' | 'wishlist' | 'booking' | 'custom' = 'cart') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add item to cart
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity: 1,
          selectedFoil: product.foilOptions ? product.foilOptions[0] : undefined,
        },
      ];
    });
    showToast(`Added "${product.name}" to your bag`, 'cart');
  };

  // Add item to cart with options
  const handleAddToCartWithOptions = (
    product: Product,
    quantity: number,
    selectedFoil?: string,
    engraving?: string
  ) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity,
        selectedFoil,
        customEngraving: engraving,
      },
    ]);
    showToast(`Added ${quantity}x "${product.name}" to your bag`, 'cart');
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed "${product.name}" from favorites`, 'wishlist');
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`Saved "${product.name}" to favorites`, 'wishlist');
    }
  };

  const handleSelectCategoryFromNav = (cat: ProductCategory) => {
    setActiveCategory(cat);
    setFilterState((prev) => ({ ...prev, category: cat }));
  };

  const handleProceedToCheckout = (discount: number) => {
    setDiscountAmount(discount);
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleCustomOrderSuccess = (req: CustomOrderRequest) => {
    showToast(`Custom ${req.serviceType} request submitted!`, 'custom');
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <AuthProvider onToast={showToast}>
      <div className="min-h-screen bg-[#F0F6F9] text-[#1E3F4E] font-sans selection:bg-[#B9D8E1] selection:text-[#142C37] flex flex-col justify-between">
        <ScrollToTop />

      <div>
        {/* Glassmorphic Navbar */}
        <GlassNavbar
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setCartDrawerOpen(true)}
          onOpenWishlist={() => setWishlistModalOpen(true)}
          onSelectCategory={handleSelectCategoryFromNav}
          activeCategory={activeCategory}
          onOpenCustomModal={() => setCustomModalOpen(true)}
          searchQuery={filterState.searchQuery}
          setSearchQuery={(query) => setFilterState((prev) => ({ ...prev, searchQuery: query }))}
        />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={PRODUCTS}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            }
          />

          <Route
            path="/shop"
            element={
              <ShopPage
                products={PRODUCTS}
                filterState={filterState}
                setFilterState={setFilterState}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                products={PRODUCTS}
                onAddToCartWithOptions={handleAddToCartWithOptions}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={handleAddToCart}
              />
            }
          />

          <Route
            path="/custom-commissions"
            element={
              <CustomCommissionsPage onCustomOrderSuccess={handleCustomOrderSuccess} />
            }
          />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      {/* Footer Section */}
      <FooterSection
        onSelectCategory={handleSelectCategoryFromNav}
        onOpenCustomModal={() => setCustomModalOpen(true)}
      />

      {/* Quick View / Customization Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCartWithOptions={handleAddToCartWithOptions}
      />

      {/* Bespoke Custom Commission Modal */}
      <CustomOrderModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        onSubmitSuccess={handleCustomOrderSuccess}
      />

      {/* Glassmorphic Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cartItems}
        discountAmount={discountAmount}
        onOrderCompleted={() => setCartItems([])}
      />

      {/* Wishlist Favorites Modal */}
      <WishlistModal
        isOpen={wishlistModalOpen}
        onClose={() => setWishlistModalOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Authentication Modal (Sign In / Register / Forgot Password) */}
      <AuthModal />

      {/* User Profile & Orders Modal */}
      <UserProfileModal />

      {/* Feedback Toast Notification */}
      <ToastNotification message={toastMessage} type={toastType} />

      {/* Floating Direct WhatsApp Action Button */}
      <WhatsAppButton />

    </div>
    </AuthProvider>
  );
}

