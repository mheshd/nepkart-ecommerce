import { products } from "../data/products";
import type { Product } from "../types/productType";

export const getProducts = (): Product[] => [...products];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  );
};

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(lowerQuery));
};

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};
