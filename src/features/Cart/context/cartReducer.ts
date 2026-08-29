import type { CartItem, CartAction } from "../../../types/cartType";

export function CartReducer(state: CartItem[], action: CartAction) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color,
      );
      if (existing) {
        return state.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
      }
      return [...state, action.payload];
    }
    case "REMOVE_FROM_CART": {
      return state.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.size === action.payload.size &&
            item.color === action.payload.color
          ),
      );
    }
    case "UPDATE_QUANTITY": {
      return state.map((item) =>
        item.productId === action.payload.productId &&
        item.size === action.payload.size &&
        item.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
    }
    case "CLEAR_CART": {
      return [];
    }
    default: {
      return state;
    }
  }
}
