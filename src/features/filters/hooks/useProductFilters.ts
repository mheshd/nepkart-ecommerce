import { useMemo, useState } from "react";
import type { Product } from "../../../types/productType";

export function useProductFilter(products: Product[]) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc" | null>(
    null,
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchesSize =
        selectedSizes.length === 0 ||
        p.sizes.some((s) => selectedSizes.includes(s));
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchRating = p.rating >= minRating;
      return matchesBrand && matchesSize && matchPrice && matchRating;
    });
    if (sortOrder === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [
    products,
    selectedBrands,
    selectedSizes,
    priceRange,
    minRating,
    sortOrder,
  ]);

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  }

  function toggleSize(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  }

  function setPriceFilter(min: number, max: number) {
    setPriceRange([min, max]);
  }

  return {
    selectedBrands,
    toggleBrand,
    filteredProducts,
    toggleSize,
    selectedSizes,
    priceRange,
    setPriceFilter,
    minRating,
    setMinRating,
    sortOrder,
    setSortOrder,
  };
}
