import { useState, useEffect } from "react";
import { searchProducts } from "../../../services/productService";
import type { Product } from "../../../types/productType";

export function useSearch(query: string) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    const timer = setTimeout(() => {
      setResults(searchProducts(query));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return { loading, results };
}
