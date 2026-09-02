import { CartProvider, useCartContext } from "./CartContext";
import { renderHook, act } from "@testing-library/react";
import type { CartItem } from "../../../types/cartType";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("start with empty cart when localstorage is empty", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
  });

  it("load cart item  from localStorage on init", () => {
    const savedCart = [
      { productId: 1, size: "M", color: "Black", quantity: 2 },
    ] as CartItem[];
    localStorage.setItem("cart", JSON.stringify(savedCart));

    const { result } = renderHook(() => useCartContext(), { wrapper });
    expect(result.current.cartItems).toEqual(savedCart);
  });

  it("falls back to empty array when localStorage has invalid JSON", () => {
    localStorage.setItem("cart", "invalid JSON");

    const { result } = renderHook(() => useCartContext(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
  });

  it("persists cart items to localStorage after addToCart ", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addToCart({
        productId: 1,
        size: "M",
        color: "Black",
        quantity: 1,
        name: "Classic Oversized T-Shirt",
        price: 29.99,
        image: "/images/products/oversized-tshirt-1.jpg",
      });
    });

    const stored = JSON.parse(localStorage.getItem("cart")!);
    expect(stored).toEqual([
      {
        productId: 1,
        size: "M",
        color: "Black",
        quantity: 1,
        name: "Classic Oversized T-Shirt",
        price: 29.99,
        image: "/images/products/oversized-tshirt-1.jpg",
      },
    ]);
  });
});

describe("cartProvider actions", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  const testItem = {
    productId: 1,
    size: "M",
    color: "Black",
    quantity: 1,
    name: "Classic Oversized T-Shirt",
    price: 29.99,
    image: "/images/products/oversized-tshirt-1.jpg",
  };

  it("addToCart adds an item to the cart", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addToCart(testItem);
    });
    expect(result.current.cartItems).toEqual([testItem]);
  });

  it("remove item form cart", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      result.current.addToCart(testItem);
    });

    act(() => {
      result.current.removeFromCart(1, "M", "Black");
    });
    expect(result.current.cartItems).toEqual([]);
  });

  it("update quantity of an item from cart", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addToCart(testItem);
    });

    act(() => {
      result.current.updateQuantity(1, "M", "Black", 2);
    });
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it("clearCart removes all items from the cart", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addToCart(testItem);
    });
    act(() => {
      result.current.clearCart();
    });
    expect(result.current.cartItems).toEqual([]);
  });

  it("throws when useCartContext is used outside a CartProvider", () => {
    expect(() => renderHook(() => useCartContext())).toThrow(
      "useCartContext must be used within a CartProvider",
    );
  });
});
