import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productService";
import type { Product } from "../../../types/productType";

export const useProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
    setLoading(false);
  }, []);

  return { loading, products };
};
