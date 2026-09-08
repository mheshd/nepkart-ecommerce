import CartItems from "./CartItems";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as CartContext from "../context/CartContext";
import type { CartItem } from "../../../types/cartType";

vi.mock("../context/CartContext", () => ({
  useCartContext: vi.fn(),
}));

const mockItems = {
  productId: 1,
  name: "Classic Oversized T-Shirt",
  price: 29.99,
  image: "/images/products/oversized-tshirt-1.jpg",
  size: "M",
  color: "Black",
  quantity: 5,
} as CartItem;

describe("CartItems", () => {
  const updateQuantityMock = vi.fn();
  const removeFromCartMock = vi.fn();

  beforeEach(() => {
    updateQuantityMock.mockClear();
    removeFromCartMock.mockClear();

    vi.mocked(CartContext.useCartContext).mockReturnValue({
      updateQuantity: updateQuantityMock,
      removeFromCart: removeFromCartMock,
    } as any);
  });

  it("calls updateQuantity with qunatity - 1 when decrease button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <CartItems item={mockItems} checked={false} onToggleSelect={vi.fn()} />,
    );
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(updateQuantityMock).toHaveBeenCalledWith(1, "M", "Black", 4);
  });

  it("calls updateQuantity with qunatity + 1 when increase button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <CartItems item={mockItems} checked={false} onToggleSelect={vi.fn()} />,
    );
    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(updateQuantityMock).toHaveBeenCalledWith(1, "M", "Black", 6);
  });

  it("calls removeFromCart when trash icon is clicked", async () => {
    const user = userEvent.setup();
    render(
      <CartItems item={mockItems} checked={false} onToggleSelect={vi.fn()} />,
    );
    await user.click(screen.getByRole("button", { name: "remove-button" }));
    expect(removeFromCartMock).toHaveBeenCalledWith(1, "M", "Black");
  });

  it("decreases buttton is disabled when quantity is 1", () => {
    const itemWithQuantityOne = { ...mockItems, quantity: 1 };
    render(
      <CartItems
        item={itemWithQuantityOne}
        checked={false}
        onToggleSelect={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Decrease quantity" }),
    ).toBeDisabled();
  });

  it("calls onToggleSelect when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onToggleSelectMock = vi.fn();
    render(
      <CartItems
        item={mockItems}
        checked={false}
        onToggleSelect={onToggleSelectMock}
      />,
    );
    await user.click(
      screen.getByRole("checkbox", {
        name: `Select ${mockItems.name} for checkout`,
      }),
    );
    expect(onToggleSelectMock).toHaveBeenCalled();
  });

  it("renders the checkbox as checked when checked prop is true", () => {
    render(
      <CartItems item={mockItems} checked={true} onToggleSelect={vi.fn()} />,
    );
    expect(
      screen.getByRole("checkbox", {
        name: `Select ${mockItems.name} for checkout`,
      }),
    ).toBeChecked();
  });

  it("when size null and color null then size and color not render", () => {
    const itemWithNoSizeColor = { ...mockItems, size: null, color: null };
    render(
      <CartItems
        item={itemWithNoSizeColor}
        checked={false}
        onToggleSelect={vi.fn()}
      />,
    );
    expect(screen.queryByText(/Size:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Color:/)).not.toBeInTheDocument();
  });

  it("renders size and color when they are provided", () => {
    const itemWithSizeColor = { ...mockItems, size: "M", color: "Black" };
    render(
      <CartItems
        item={itemWithSizeColor}
        checked={false}
        onToggleSelect={vi.fn()}
      />,
    );
    expect(screen.getByText(/Size:/)).toBeInTheDocument();
    expect(screen.getByText(/Color:/)).toBeInTheDocument();
  });

  it("renders the correct total price based on quantity and price", () => {
    const itemWithQuantity = { ...mockItems, quantity: 3, price: 10 };
    render(
      <CartItems
        item={itemWithQuantity}
        checked={false}
        onToggleSelect={vi.fn()}
      />,
    );
    const totalPrice = itemWithQuantity.price * itemWithQuantity.quantity;
    expect(
      screen.getByText(new RegExp(totalPrice.toFixed(2))),
    ).toBeInTheDocument();
  });
});
