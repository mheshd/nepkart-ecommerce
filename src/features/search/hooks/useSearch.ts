import { useState, useEffect } from "react";
import { searchProducts } from "../../../services/productService";
import type { Product } from "../../../types/productType";

export function UseSearch(query: string) {
  const [result, setResult] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResult([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    const timer = setTimeout(() => {
      setResult(searchProducts(query));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return { loading, result };
}
