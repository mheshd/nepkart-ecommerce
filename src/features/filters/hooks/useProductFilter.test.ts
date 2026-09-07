import { renderHook, act } from "@testing-library/react";
import type { Product } from "../../../types/productType";
import { useProductFilter } from "./useProductFilters";

const mockProducts = [
  { id: 1, brand: "NOVA", sizes: ["S", "M"], price: 20, rating: 4.5 },
  { id: 2, brand: "StreetForm", sizes: ["L", "XL"], price: 50, rating: 3.8 },
  { id: 3, brand: "NOVA", sizes: ["M", "L"], price: 35, rating: 4.9 },
] as Product[];

describe("useProductFilter", () => {
  it("return all products when no filter are applied ", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    expect(result.current.filteredProducts).toEqual(mockProducts);
  });
});

describe("toggleBrand", () => {
  it("filter to only the selected brand", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.toggleBrand("NOVA");
    });
    expect(result.current.filteredProducts).toEqual([
      mockProducts[0],
      mockProducts[2],
    ]);
  });

  it("toogling the same brand again remove the filter", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.toggleBrand("NOVA");
    });
    act(() => {
      result.current.toggleBrand("NOVA");
    });
    expect(result.current.filteredProducts).toEqual(mockProducts);
  });

  it("return empty array when brand has no matching the prodcut", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.toggleBrand("Nonexistent");
    });
    expect(result.current.filteredProducts).toEqual([]);
  });
});

describe("toggleSize", () => {
  it("filters to products containing the selelcted size", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.toggleSize("S");
    });
    expect(result.current.filteredProducts).toEqual([mockProducts[0]]);
  });

  it("matches a product if any of its sizes is selected ", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.toggleSize("L");
    });
    expect(result.current.filteredProducts).toEqual([
      mockProducts[1],
      mockProducts[2],
    ]);
  });
  it("toggling the same size again removes the filter", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.toggleSize("S");
    });
    act(() => {
      result.current.toggleSize("S");
    });
    expect(result.current.filteredProducts).toEqual(mockProducts);
  });
});

describe("setPriceFilter", () => {
  it("filters products within the price range", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.setPriceFilter(25, 40);
    });
    expect(result.current.filteredProducts).toEqual([mockProducts[2]]);
  });

  it("includes products price exactly at min or max boundary", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.setPriceFilter(20, 35);
    });
    expect(result.current.filteredProducts).toEqual([
      mockProducts[0],
      mockProducts[2],
    ]);
  });
});

describe("setMinRating", () => {
  it("excludes products below the minimum  ratting", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.setMinRating(4.5);
    });
    expect(result.current.filteredProducts).toEqual([
      mockProducts[0],
      mockProducts[2],
    ]);
  });
});

describe("sortOrder", () => {
  it("sort a product assending price low to high", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.setSortOrder("price-asc");
    });
    expect(result.current.filteredProducts).toEqual([
      mockProducts[0],
      mockProducts[2],
      mockProducts[1],
    ]);
  });

  it("sort product price-descending price hight to low", () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.setSortOrder("price-desc");
    });
    expect(result.current.filteredProducts).toEqual([
      mockProducts[1],
      mockProducts[2],
      mockProducts[0],
    ]);
  });
});
