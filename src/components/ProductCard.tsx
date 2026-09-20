import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-2.5 sm:p-4 shadow-sm hover:shadow-md border border-[#DADEE1] transition-all flex flex-col justify-between group h-full"
    >
      {/* Product Image Frame */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="relative rounded-xl overflow-hidden bg-[#EAF4F8] aspect-[3/4] mb-2 sm:mb-3.5 flex items-center justify-center cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Sale or Bestseller Badge */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10">
          {product.salePrice && (
            <span className="bg-[#447F98] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
              Sale
            </span>
          )}
          {product.isBestseller && !product.salePrice && (
            <span className="bg-white/90 text-[#447F98] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full border border-[#B9D8E1] shadow-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 p-1.5 sm:p-2 rounded-full transition-all z-10 ${
            isWishlisted
              ? 'bg-[#447F98] text-white'
              : 'bg-white/80 hover:bg-white text-[#142C37]'
          }`}
          title="Save to Favorites"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 sm:p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white/95 hover:bg-white text-[#142C37] text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm flex items-center gap-1 sm:gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all border border-[#B9D8E1]"
          >
            <Eye className="w-3.5 h-3.5 text-[#447F98]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Info Block */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link
            to={`/product/${product.id}`}
            className="font-serif font-bold text-[#142C37] text-sm sm:text-base md:text-lg hover:text-[#447F98] transition-colors leading-snug line-clamp-1 block"
          >
            {product.name}
          </Link>

          {/* Subtitle / Description */}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2 sm:mb-3">
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-[#142C37]">{product.rating}</span>
            <span className="text-[10px] sm:text-[11px] text-[#5C7C8B]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart Pill Button */}
        <div className="pt-2 border-t border-[#EAF3F7] flex items-center justify-between gap-1.5 sm:gap-2 mt-auto">
          <div>
            {product.salePrice ? (
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="font-serif font-bold text-[#447F98] text-sm sm:text-base md:text-lg">
                  ₹{product.salePrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] sm:text-xs text-[#5C7C8B] line-through">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
            ) : (
              <span className="font-serif font-bold text-[#142C37] text-sm sm:text-base md:text-lg">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-[#447F98] hover:bg-[#386D82] text-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all shadow-xs flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

