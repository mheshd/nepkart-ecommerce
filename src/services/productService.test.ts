import type { Product } from "../types/productType";
import {
  getProductById,
  getProductBySlug,
  getBrandList,
  getProductsByCategory,
  getProductsByBrand,
  getSizeList,
  getCategories,
  searchProducts,
} from "./productService";

describe("productService", () => {
  it("ruturn unique brand name", () => {
    const product = [
      { brand: "NOVA" },
      { brand: "Nick" },
      { brand: "NOVA" },
    ] as Product[];
    const result = getBrandList(product);
    expect(result).toEqual(["NOVA", "Nick"]);
  });

  it(" return a empty array when given no product", () => {
    expect(getBrandList([])).toEqual([]);
  });
  it("returns unique categories", () => {
    const result = getCategories();
    expect(new Set(result)).toEqual(
      new Set([
        "clothing",
        "shoes",
        "bags",
        "accessories",
        "electronics",
        "home-lifestyle",
      ]),
    );
  });

  it("return unique product sizes", () => {
    const product = [
      { sizes: ["S", "XL"] },
      { sizes: ["S", "L", "XL"] },
    ] as Product[];

    const result = getSizeList(product);
    expect(new Set(result)).toEqual(new Set(["S", "L", "XL"]));
  });

  it("returns empty array when given no products", () => {
    expect(getSizeList([])).toEqual([]);
  });

  it("filter product by category, case-insensitively", () => {
    const results = getProductsByCategory("CLOTHING");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.category === "clothing")).toBe(true);
  });

  it("return empty array for a category that does not exist", () => {
    const result = getProductsByCategory("hkshfkjshdfk");
    expect(result).toEqual([]);
  });

  it("filter product by brand, case-insensitively", () => {
    const results = getProductsByBrand("streetform");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.brand === "StreetForm")).toBe(true);
  });

  it("returns empty array for a brand that doesn't exist", () => {
    const results = getProductsByBrand("nonexistent-brand");
    expect(results).toEqual([]);
  });

  it("find a  product by slug", () => {
    const result = getProductBySlug("trail-walking-shoes");
    expect(result?.name).toBe("Trail Walking Shoes");
  });
  it("return undefined on unknown slug", () => {
    expect(getProductBySlug("does not exist")).toBeUndefined();
  });

  it("find a product by id ", () => {
    const reusult = getProductById(1);
    expect(reusult?.slug).toBe("classic-oversized-t-shirt");
  });
  it("return a undefined on unknown id", () => {
    expect(getProductById(0)).toBeUndefined();
  });

  it("find a exact product by search", () => {
    const result = searchProducts("t-shirt");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Classic Oversized T-Shirt");
  });

  it("returns empty array when search has no match", () => {
    const result = searchProducts("flafkh");
    expect(result).toEqual([]);
  });

  it("matches partial substrings within a product name", () => {
    const result = searchProducts("shirt");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.name.toLowerCase().includes("shirt"))).toBe(
      true,
    );
  });
});
