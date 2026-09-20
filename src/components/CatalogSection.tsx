import React from 'react';
import { motion } from 'motion/react';
import { Product, ProductCategory, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Search, RefreshCw } from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlistIds: string[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  filterState,
  setFilterState,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
}) => {
  // Filtering logic
  const filteredProducts = products.filter((p) => {
    // Category match
    if (filterState.category !== 'all' && p.category !== filterState.category) {
      return false;
    }
    // Search match
    if (filterState.searchQuery) {
      const query = filterState.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(query);
      const matchTag = p.tags?.some((t) => t.toLowerCase().includes(query));
    }
    // Price match
    if (p.price > filterState.priceMax) return false;
    // On sale match
    if (filterState.onlyOnSale && !p.salePrice) return false;
    // In stock match
    if (filterState.onlyInStock && !p.inStock) return false;

    return true;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filterState.sortBy === 'price-low') {
      return (a.salePrice || a.price) - (b.salePrice || b.price);
    }
    if (filterState.sortBy === 'price-high') {
      return (b.salePrice || b.price) - (a.salePrice || a.price);
    }
    if (filterState.sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // featured default
  });

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'bouquet', label: 'bouquet' },
    { id: 'gifts hamper', label: 'gifts hamper' },
    { id: 'valentines gift', label: 'valentines gift' },
    { id: 'nails extension', label: 'nails extension' },
    { id: 'flower', label: 'flower' },
  ];

  return (
    <section id="catalog" className="py-16 sm:py-20 bg-[#F0F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#142C37] tracking-tight mb-2">
            Explore Handcrafted Gifts
          </h2>
          <p className="text-sm text-[#5C7C8B]">
            Custom handcrafted crochet bouquet, valetines gift hamper, and Invitation cards.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterState((prev) => ({ ...prev, category: cat.id }))}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-xs ${
                filterState.category === cat.id
                  ? 'bg-[#447F98] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-[#142C37] border border-[#B9D8E1]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Controls Bar (Sort, Filter options) */}
        <div className="glass-card p-4 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#629BB5]" />
            <input
              type="text"
              placeholder="Search coasters, trays, clocks..."
              value={filterState.searchQuery}
              onChange={(e) =>
                setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              className="w-full bg-white/95 border border-[#B9D8E1] rounded-full pl-9 pr-4 py-1.5 text-xs text-[#142C37] focus:outline-none focus:ring-2 focus:ring-[#447F98]"
            />
          </div>

          {/* Quick Filters & Sort */}
          <div className="flex flex-wrap items-center gap-3 text-xs w-full md:w-auto justify-between md:justify-end">
            
            <label className="flex items-center gap-1.5 text-[#142C37] cursor-pointer">
              <input
                type="checkbox"
                checked={filterState.onlyOnSale}
                onChange={(e) =>
                  setFilterState((prev) => ({ ...prev, onlyOnSale: e.target.checked }))
                }
                className="accent-[#447F98]"
              />
              <span>Sale Items</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-[#5C7C8B] font-medium">Sort by:</span>
              <select
                value={filterState.sortBy}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    sortBy: e.target.value as FilterState['sortBy'],
                  }))
                }
                className="bg-white/95 border border-[#B9D8E1] text-xs text-[#142C37] px-3 py-1.5 rounded-full focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {(filterState.searchQuery || filterState.category !== 'all' || filterState.onlyOnSale) && (
              <button
                onClick={() =>
                  setFilterState({
                    category: 'all',
                    searchQuery: '',
                    sortBy: 'featured',
                    priceMax: 6000,
                    onlyInStock: false,
                    onlyOnSale: false,
                  })
                }
                className="text-[#447F98] font-semibold flex items-center gap-1 hover:underline"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}

          </div>

        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {sortedProducts.map((product) => (
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
        ) : (
          <div className="bg-white/80 rounded-3xl p-12 text-center max-w-md mx-auto my-8 border border-[#B9D8E1]">
            <p className="text-lg font-serif text-[#142C37] font-bold mb-2">
              No matching resin art pieces found
            </p>
            <p className="text-xs text-[#5C7C8B] mb-4">
              Try adjusting your search query or reset your active filters.
            </p>
            <button
              onClick={() =>
                setFilterState({
                  category: 'all',
                  searchQuery: '',
                  sortBy: 'featured',
                  priceMax: 300,
                  onlyInStock: false,
                  onlyOnSale: false,
                })
              }
              className="bg-[#447F98] hover:bg-[#386D82] text-white text-xs font-semibold px-5 py-2 rounded-full"
            >
              Show All Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
