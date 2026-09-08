import type { CartItem } from "../../../types/cartType";
import { CartReducer } from "./cartReducer";

const mockItem: CartItem = {
  productId: 1,
  name: "T-Shirt",
  price: 29.99,
  image: "img.jpg",
  size: "M",
  color: "Black",
  quantity: 1,
};

describe("cartReducer", () => {
  // addtocart
  it("add a new item to cart", () => {
    const result = CartReducer([], { type: "ADD_TO_CART", payload: mockItem });
    expect(result).toEqual([mockItem]);
  });

  it("merge a quantity when same productId/size/color already exists", () => {
    const result = CartReducer([mockItem], {
      type: "ADD_TO_CART",
      payload: mockItem,
    });
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it("adds as a separate item when size differs", () => {
    const differentSize = { ...mockItem, size: "L" };
    const result = CartReducer([mockItem], {
      type: "ADD_TO_CART",
      payload: differentSize,
    });
    expect(result).toHaveLength(2);
  });

  //   remove

  it("removes the matching item", () => {
    const result = CartReducer([mockItem], {
      type: "REMOVE_FROM_CART",
      payload: { productId: 1, size: "M", color: "Black" },
    });
    expect(result).toEqual([]);
  });

  it("does nothing when item is not in cart", () => {
    const result = CartReducer([mockItem], {
      type: "REMOVE_FROM_CART",
      payload: { productId: 99, size: "M", color: "Black" },
    });
    expect(result).toEqual([mockItem]);
  });

  //   UPDATE_QUANTITY

  it("updates quantity of the matching item", () => {
    const result = CartReducer([mockItem], {
      type: "UPDATE_QUANTITY",
      payload: { productId: 1, size: "M", color: "Black", quantity: 3 },
    });
    expect(result[0].quantity).toBe(3);
  });

  //   clear cart
  it("clear the cart", () => {
    const result = CartReducer([mockItem], { type: "CLEAR_CART" });
    expect(result).toEqual([]);
  });
});
