import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Heart, ShoppingBag, ArrowLeft, Check, Sparkles, Shield, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  products: Product[];
  onAddToCartWithOptions: (product: Product, quantity: number, foil?: string, engraving?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  products,
  onAddToCartWithOptions,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onAddToCart,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [customEngraving, setCustomEngraving] = useState('');
  const [selectedImage, setSelectedImage] = useState(product?.image || '');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      setCustomEngraving('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, product]);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#142C37]">Product Not Found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 px-6 py-2 bg-[#447F98] hover:bg-[#386D82] text-white rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isSaved = wishlistIds.includes(product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const galleryImages = [
    product.image,
    ...products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 2).map((p) => p.image)
  ];


  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#447F98] hover:text-[#142C37] mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left: Gallery Showcase */}
        <div className="space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-[#B9D8E1] shadow-lg aspect-square">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                isSaved ? 'bg-rose-500 text-white' : 'bg-white/80 text-[#142C37] hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImage === img ? 'border-[#447F98] scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details & Options */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#447F98]">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#142C37] mt-1">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-amber-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#142C37]">{product.rating}</span>
              <span className="text-xs text-[#5C7C8B]">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 border-y border-[#B9D8E1] py-4">
            <span className="text-3xl font-bold font-serif text-[#447F98]">
              ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
            </span>
            {product.salePrice && (
              <span className="text-lg text-gray-400 line-through">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
            <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              In Stock & Ready to Ship
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#142C37] flex items-center justify-between">
              <span>Personalized Engraving / Monogram</span>
              <span className="text-[10px] text-gray-500 font-normal">(Optional, +₹300)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 'S & J - 2026' or initials"
              maxLength={25}
              value={customEngraving}
              onChange={(e) => setCustomEngraving(e.target.value)}
              className="w-full bg-white border border-[#B9D8E1] rounded-xl px-3.5 py-2.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
            />
          </div>

          {/* Quantity & Add to Bag */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-[#B9D8E1] bg-white rounded-full p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EAF4F8] text-[#142C37] font-bold cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-bold text-[#142C37]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EAF4F8] text-[#142C37] font-bold cursor-pointer"
              >
                +
              </button>
            </div>

          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#B9D8E1] text-center text-[11px] text-[#5C7C8B]">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-[#447F98]" />
              <span>Free Shipping ₹1999+</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RefreshCw className="w-4 h-4 text-[#447F98]" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-10 border-t border-[#B9D8E1]">
          <h2 className="text-2xl font-serif font-bold text-[#142C37] text-center mb-8">
            You Might Also Love
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(p.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
