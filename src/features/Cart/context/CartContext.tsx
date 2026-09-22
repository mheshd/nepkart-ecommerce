import { createContext, useContext, useEffect, useReducer } from "react";
import type { CartItem } from "../../../types/cartType";
import { CartReducer } from "./cartReducer";
import { useAuth } from "../../auth/context/AuthContext";

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

function loadCartFromStorage(key: string, initial: CartItem[]): CartItem[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  } catch {
    return initial;
  }
}

function CartStateProvider({
  storageKey,
  children,
}: {
  storageKey: string | null;
  children: React.ReactNode;
}) {
  const [cartItems, dispatch] = useReducer(CartReducer, [], () =>
    storageKey ? loadCartFromStorage(storageKey, []) : [],
  );

  useEffect(() => {
    if (!storageKey) return;

    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey]);

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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  const remountKey = loading ? "auth-loading" : (user?.id ?? "guest");
  const storageKey = loading ? null : user ? `cart${user.id}` : null;

  return (
    <CartStateProvider key={remountKey} storageKey={storageKey}>
      {children}
    </CartStateProvider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
