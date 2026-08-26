import { createContext, useContext, useEffect, useReducer } from "react";
import type { CartItem } from "../../../types/cartType";
import { CartReducer } from "./cartReducer";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    productId: number,
    size: string | null,
    color: string | null,
  ) => void;
  updateQuantity: (
    productId: number,
    size: string | null,
    color: string | null,
    quantity: number,
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = "cart";

function loadCartFromStorage(initial: CartItem[]): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initial;
  } catch {
    return initial;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, dispatch] = useReducer(
    CartReducer,
    [],
    loadCartFromStorage,
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (
    productId: number,
    size: string | null,
    color: string | null,
  ) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId, size, color } });
  };

  const updateQuantity = (
    productId: number,
    size: string | null,
    color: string | null,
    quantity: number,
  ) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, size, color, quantity },
    });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
