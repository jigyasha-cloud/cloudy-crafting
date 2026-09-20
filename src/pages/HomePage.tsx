import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { BestsellersSection } from '../components/BestsellersSection';
import { PromoBannerSection } from '../components/PromoBannerSection';
import { SocialReelsSection } from '../components/SocialReelsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Product } from '../types';

interface HomePageProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlistIds: string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection
        onShopClick={() => navigate('/shop')}
        onCustomClick={() => navigate('/custom-commissions')}
      />

      <BestsellersSection
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        onToggleWishlist={onToggleWishlist}
        wishlistIds={wishlistIds}
      />

      <PromoBannerSection
        onShopSaleClick={() => navigate('/shop?sale=true')}
      />

      <SocialReelsSection
        onOpenShop={() => navigate('/shop')}
      />

      <TestimonialsSection
        onCustomClick={() => navigate('/custom-commissions')}
        onShopClick={() => navigate('/shop')}
      />
    </div>
  );
};

