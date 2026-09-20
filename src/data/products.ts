import { Product, Review } from '../types';

import product1img from '../assets/images/product-1.jfif';
import product2img from '../assets/images/product-2.jfif';
import product3img from '../assets/images/product-3.jfif';
import product4img from '../assets/images/product-4.jfif';
import product5img from '../assets/images/product-5.jfif';
import product6img from '../assets/images/product-6.jfif';
import product7img from '../assets/images/product-7.jfif';
import product8img from '../assets/images/product-8.jfif';

export const HERO_BANNER_IMAGE = product2img;

export const PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'kitkat with red roses bouquet',
    category: 'bouquet',
    price: 1299,
    salePrice: 999,
    rating: 4.9,
    reviewsCount: 128,
    image: product1img,
    dimensions: '4.2" Diameter x 0.35" Thick',
    inStock: true,
    isBestseller: true,
    isNewArrival: false,
    tags: ['Bestseller', 'Ocean Waves', 'Gold Leaf', 'Handcrafted']
  },
  {
    id: 'p-2',
    name: 'Crochet Flower with Pot',
    category: 'flower',
    price: 2999,
    salePrice: 2299,
    rating: 5.0,
    reviewsCount: 94,
    image: product2img,
    dimensions: '14" x 9" x 1.5"',
    inStock: true,
    isBestseller: true,
    isNewArrival: false,
    tags: ['Geode', 'Luxury Tray', 'Rose Quartz', 'Bestseller']
  },
  {
    id: 'p-3',
    name: 'nails extension',
    category: 'nails extension',
    price: 3499,
    salePrice: 2899,
    rating: 4.8,
    reviewsCount: 67,
    image: product3img,
    dimensions: '12" Diameter',
    inStock: true,
    isBestseller: true,
    isNewArrival: true,
    tags: ['Wall Clock', 'Silent Sweep', 'Gold Leaf']
  },
  {
    id: 'p-4',
    name: 'Invitation cards',
    category: 'gifts hamper',
    price: 699,
    rating: 4.9,
    reviewsCount: 210,
    image: product4img,
    dimensions: '5.5" x 1.1"',
    inStock: true,
    isBestseller: true,
    isNewArrival: false,
    tags: ['Real Flowers', 'Gift Set', 'Botanical']
  },
  {
    id: 'p-5',
    name: 'Crochet Flower Bouque',
    category: 'flower',
    price: 2499,
    salePrice: 1899,
    rating: 4.9,
    reviewsCount: 42,
    image: product5img,
    dimensions: '13" Round Platter',
    inStock: true,
    isBestseller: false,
    isNewArrival: true,
    tags: ['Ocean Wave', 'Charcuterie', 'Bamboo Wood']
  },
  {
    id: 'p-6',
    name: 'Valentines day wrap',
    category: 'valentines gift',
    price: 1699,
    salePrice: 1299,
    rating: 5.0,
    reviewsCount: 185,
    image: product6img,
    dimensions: 'Deluxe Craft Box (10" x 8" x 4")',
    inStock: true,
    isBestseller: true,
    isNewArrival: true,
    tags: ['DIY Kit', 'Step-by-Step Guide', 'Starter Set']
  },
  {
    id: 'p-7',
    name: 'Valentines gifts',
    category: 'valentines gift',
    price: 4999,
    rating: 5.0,
    reviewsCount: 56,
    image: product7img,
    dimensions: '4" x 4" x 4" Cube',
    inStock: true,
    isBestseller: false,
    isNewArrival: true,
    tags: ['Custom Keepsake', 'Wedding', 'Flower Preservation']
  },
  {
    id: 'p-8',
    name: 'Nails extensions',
    category: 'nails extension',
    price: 899,
    rating: 4.7,
    reviewsCount: 78,
    image: product8img,
    dimensions: '5" Diameter x 2" Height',
    inStock: true,
    isBestseller: false,
    isNewArrival: false,
    tags: ['Jewelry Dish', 'Lotus', 'Pearlescent']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r-1',
    author: 'Tasha M.',
    rating: 5,
    date: '3 days ago',
    verified: true,
    productName: 'Nails extension',
    comment: 'I really loved her service!'
  },
  {
    id: 'r-2',
    author: 'Sophia K.',
    rating: 5,
    date: '1 week ago',
    verified: true,
    productName: 'Velveteen Lip Nectar Resin Clock',
    comment: 'The wall clock arrived in pristine condition. The gold hands and shimmering resin waves are an absolute centerpiece in my living room! Handcrafted perfection by Neeta.'
  },
  {
    id: 'r-3',
    author: 'Elena R.',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    productName: 'HydraSilk Geode Serving Tray',
    comment: 'Packaging was so thoughtful with a handwritten thank you note from Neeta! The crushed rose quartz accents in the tray give it such a high-end luxury feel.'
  },
  {
    id: 'r-4',
    author: 'Marcus B.',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    productName: 'Cloud9 DIY Starter Resin Art Kit',
    comment: 'Bought this kit as a gift for my wife\'s birthday. The tutorial included was step-by-step and easy to follow. High quality resin with zero toxic fumes!'
  }
];
