import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CatalogSection } from '../components/CatalogSection';
import { Product, FilterState, ProductCategory } from '../types';

interface ShopPageProps {
  products: Product[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlistIds: string[];
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  filterState,
  setFilterState,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory | null;
    const sale = searchParams.get('sale');
    const search = searchParams.get('q');

    if (cat) {
      setFilterState((prev) => ({ ...prev, category: cat }));
    }
    if (sale === 'true') {
      setFilterState((prev) => ({ ...prev, onlyOnSale: true }));
    }
    if (search) {
      setFilterState((prev) => ({ ...prev, searchQuery: search }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, setFilterState]);

  return (
    <div className="pt-24 pb-16">
      <CatalogSection
        products={products}
        filterState={filterState}
        setFilterState={setFilterState}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        onToggleWishlist={onToggleWishlist}
        wishlistIds={wishlistIds}
      />
    </div>
  );
};
