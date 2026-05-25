/**
 * SARTA — Shared Product & Catalogue Types
 * Single source of truth for the product domain.
 * Import from here across: features/cart, features/product, features/shop, data/products
 */

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  subCategory?: string;
  tag?: string;
  colors: string[];
  sizes: string[];
  description: string;
  details: string[];
  image: string;
  hoverImage?: string;
  gallery: string[];
};

export type Category = {
  id: string;
  label: string;
};

export type ProductTag = "New" | "Bestseller" | "Sale" | "Limited";

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

/** Hero slide shown on the homepage carousel */
export type HeroSlide = {
  src: string;
  label: string;
};

/** Drag gallery card (homepage explore rail) */
export type DragGalleryItem = {
  src: string;
  video: string;
  title: string;
  subtitle: string;
};
