import { products } from "../data/products";
import { categoryDisplays } from "../data/category";
import type { CategoryDisplay } from "../data/category";
import type { Product } from "../types/productType";
import { brandDisplays, type BrandDisplay } from "../data/brand";

// category

export const getCategoryDisplays = (): CategoryDisplay[] => {
  return categoryDisplays;
};

// brands
export const getBrandDisplay = (): BrandDisplay[] => {
  return brandDisplays;
};

export const getBrandList = (products: Product[]): string[] => {
  return [...new Set(products.map((product) => product.brand))];
};

// size
export const getSizeList = (products: Product[]): string[] => {
  return [...new Set(products.flatMap((product) => product.sizes))];
};
// products
export const getProducts = (): Product[] => [...products];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getCategories = (): string[] => {
  return [...new Set(products.map((product) => product.category))];
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
