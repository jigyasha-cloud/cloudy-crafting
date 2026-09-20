import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface BestsellersSectionProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlistIds: string[];
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
}) => {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section id="bestsellers" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#142C37] tracking-tight mb-2"
          >
            Our Bestsellers
          </motion.h2>
          <p className="text-sm text-[#5C7C8B]">
            Most loved handcrafted resin artwork pieces, poured with love and crystal precision.
          </p>
        </div>

        {/* 2-Column Responsive Grid across desktop, tablet, and mobile */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 max-w-4xl mx-auto">
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
