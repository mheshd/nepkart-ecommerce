export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string | null;
  color: string | null;
  quantity: number;
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | {
      type: "REMOVE_FROM_CART";
      payload: { productId: number; size: string | null; color: string | null };
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        productId: number;
        size: string | null;
        color: string | null;
        quantity: number;
      };
    }
  | { type: "CLEAR_CART" };
