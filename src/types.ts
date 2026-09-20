export type ProductCategory = 
  | 'all'
  | 'bouquet'
  | 'gifts hamper'
  | 'valentines gift'
  | 'flower'
  | 'nails extension';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages?: string[];
  dimensions?: string;
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  tags?: string[];
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  quantity: number;
  selectedFoil?: string;
  customEngraving?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  verified: boolean;
  productName: string;
  comment: string;
}

export interface CustomOrderRequest {
  fullName: string;
  email: string;
  phone: string;
  serviceType: 'Wedding Flower Preservation' | 'Custom Resin Dining Tray' | 'Geode Resin Wall Art' | 'Corporate Gift Set';
  colorPalette: string;
  budget: string;
  details: string;
  preferredCompletionDate?: string;
}

export interface SocialReel {
  id: string;
  title: string;
  viewsCount: number;
  viewsFormatted: string;
  likesCount: number;
  likesFormatted: string;
  commentsCount: number;
  duration: string;
  category: 'all' | 'ocean' | 'geode' | 'keepsake' | 'gilding' | 'diy';
  categoryLabel: string;
  thumbnail: string;
  videoPreviewUrl?: string;
  audioTitle: string;
  instagramUrl: string;
  tags: string[];
  date: string;
  isViralTopPick?: boolean;
  featuredProductLink?: {
    name: string;
    url: string;
  };
}

export interface FilterState {
  category: ProductCategory;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  priceMax: number;
  onlyInStock: boolean;
  onlyOnSale: boolean;
}
