/**
 * SARTA — Products API Layer (stub)
 *
 * Currently returns static data from src/data/products.ts.
 * Replace function bodies with real fetch() calls when a backend is ready.
 *
 * All components import from HERE — never directly from data/products.ts —
 * so swapping to a live API only requires changes in this file.
 *
 * Future signature shape:
 *   GET /api/products          → Product[]
 *   GET /api/products/:slug    → Product
 *   GET /api/categories        → Category[]
 */

import type { Product, Category } from "@/types/product";
import { products, categories, getProductBySlug } from "@/data/products";

/** Fetch all products (currently static) */
export async function fetchProducts(): Promise<Product[]> {
  // TODO: replace with fetch('/api/products').then(r => r.json())
  return Promise.resolve(products);
}

/** Fetch a single product by slug */
export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  // TODO: replace with fetch(`/api/products/${slug}`).then(r => r.json())
  return Promise.resolve(getProductBySlug(slug));
}

/** Fetch all categories */
export async function fetchCategories(): Promise<readonly Category[]> {
  // TODO: replace with fetch('/api/categories').then(r => r.json())
  return Promise.resolve(categories);
}
