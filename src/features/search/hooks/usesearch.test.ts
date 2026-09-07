import { renderHook, act } from "@testing-library/react";
import { useSearch } from "./useSearch";
import * as productService from "../../../services/productService";
import type { Product } from "../../../types/productType";

vi.mock("../../../services/productService", () => ({
  searchProducts: vi.fn(),
}));

describe("useSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(productService.searchProducts).mockReset();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns empty results , loading false and does not call searchProducts when query is empty", () => {
    const { result } = renderHook(({ query }) => useSearch(query), {
      initialProps: { query: "" },
    });

    expect(result.current.results).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(productService.searchProducts).not.toHaveBeenCalled();
  });

  it("returns loading true immedaitly when query is set and before the debounce fires", () => {
    const { result, rerender } = renderHook(({ query }) => useSearch(query), {
      initialProps: { query: "" },
    });
    rerender({ query: "shirt" });
    expect(result.current.loading).toBe(true);
    expect(result.current.results).toEqual([]);
  });

  it("returns the results when query is correct ", () => {
    const mockProduct = { id: 1, name: "Classic Oversized T-Shirt" } as Product;
    vi.mocked(productService.searchProducts).mockReturnValue([mockProduct]);

    const { result, rerender } = renderHook(({ query }) => useSearch(query), {
      initialProps: { query: "" },
    });
    rerender({ query: "shirt" });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(productService.searchProducts).toHaveBeenCalledWith("shirt");
    expect(result.current.loading).toBe(false);
    expect(result.current.results).toEqual([mockProduct]);
  });

  it("cancel the previous timer when query changes before the debounce completes", () => {
    vi.mocked(productService.searchProducts).mockReturnValue([]);
    const { rerender } = renderHook(({ query }) => useSearch(query), {
      initialProps: { query: "" },
    });
    rerender({ query: "sh" });

    act(() => {
      vi.advanceTimersByTime(150);
    });
    rerender({ query: "shirt" });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(productService.searchProducts).toHaveBeenCalledWith("shirt");
    expect(productService.searchProducts).toHaveBeenCalledTimes(1);
  });

  it("does not throw and update state after unmount", () => {
    const { rerender, unmount } = renderHook(({ query }) => useSearch(query), {
      initialProps: { query: "shirt" },
    });
    rerender({ query: "shirt" });
    unmount();

    expect(() => {
      act(() => {
        vi.advanceTimersByTime(300);
      });
    }).not.toThrow();
  });
});
