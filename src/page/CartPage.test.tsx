import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPage from "./CartPage";
import * as CartContext from "../features/Cart/context/CartContext";
import type { CartItem } from "../types/cartType";

vi.mock("../features/Cart/context/CartContext", () => ({
  useCartContext: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

vi.mock("../features/Cart/components/CartItems", () => ({
  default: ({ item, checked, onToggleSelect }: any) => (
    <div data-testid={`cart-item-${item.productId}-${item.size}-${item.color}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggleSelect}
        aria-label={`select-${item.name}`}
      />
      {item.name}
    </div>
  ),
}));

vi.mock("../features/Cart/components/CartSummary", () => ({
  default: ({ itemCount, subtotal }: any) => (
    <div data-testid="cart-summary">
      count:{itemCount} subtotal:{subtotal}
    </div>
  ),
}));

const item1 = {
  productId: 1,
  name: "T-Shirt",
  size: "M",
  color: "Black",
  price: 20,
  quantity: 2,
  image: "img1.jpg",
} as CartItem;

const item2 = {
  productId: 2,
  name: "Shoes",
  size: "L",
  color: "White",
  price: 50,
  quantity: 1,
  image: "img2.jpg",
} as CartItem;

describe("CartPage", () => {
  beforeEach(() => {
    vi.mocked(CartContext.useCartContext).mockReturnValue({
      cartItems: [item1, item2],
    } as any);
  });

  it("shows empty cart message and Continue shopping link when cartItems is empty", () => {
    vi.mocked(CartContext.useCartContext).mockReturnValue({
      cartItems: [],
    } as any);

    render(<CartPage />);

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(screen.getByText("Continue shopping")).toHaveAttribute("href", "/");
  });

  it("renders a CartItems entry for each item in the cart", () => {
    render(<CartPage />);
    expect(screen.getByTestId("cart-item-1-M-Black")).toBeInTheDocument();
    expect(screen.getByTestId("cart-item-2-L-White")).toBeInTheDocument();
  });

  it("select-all checkbox is unchecked by default when no items are selected", () => {
    render(<CartPage />);

    expect(
      screen.getByRole("checkbox", { name: /Select all/i }),
    ).not.toBeChecked();
  });

  it("selects all items when select-all checkbox is checked", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    await user.click(screen.getByRole("checkbox", { name: /Select all/i }));

    expect(
      screen.getByRole("checkbox", { name: "select-T-Shirt" }),
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: "select-Shoes" }),
    ).toBeChecked();
  });

  it("deselects all items when select-all is unchecked after being checked", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    const selectAll = screen.getByRole("checkbox", { name: /Select all/i });
    await user.click(selectAll);
    await user.click(selectAll);
    expect(
      screen.getByRole("checkbox", { name: "select-T-Shirt" }),
    ).not.toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: "select-Shoes" }),
    ).not.toBeChecked();
  });

  it("select-all checkbox becomes checked when every item is individually selected", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    await user.click(screen.getByRole("checkbox", { name: "select-T-Shirt" }));
    await user.click(screen.getByRole("checkbox", { name: "select-Shoes" }));

    expect(screen.getByRole("checkbox", { name: /Select all/i })).toBeChecked();
  });

  it("toggling one item's checkbox updates only that item's selection, not others", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    await user.click(screen.getByRole("checkbox", { name: "select-T-Shirt" }));
    expect(
      screen.getByRole("checkbox", { name: "select-T-Shirt" }),
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: "select-Shoes" }),
    ).not.toBeChecked();
  });

  it("itemCount reflects the sum of quantities of only the selected items", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    await user.click(screen.getByRole("checkbox", { name: "select-T-Shirt" }));
    expect(screen.getByTestId("cart-summary")).toHaveTextContent("count:2");
  });

  it("subtotal reflects the sum of price × quantity of only the selected items", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    await user.click(screen.getByRole("checkbox", { name: "select-T-Shirt" }));
    expect(screen.getByTestId("cart-summary")).toHaveTextContent("subtotal:40");
  });

  it("itemCount and subtotal are 0 when no items are selected", () => {
    render(<CartPage />);

    expect(screen.getByTestId("cart-summary")).toHaveTextContent("count:0");
    expect(screen.getByTestId("cart-summary")).toHaveTextContent("subtotal:0");
  });

  it("treats items with the same productId but different size/color as distinct entries", () => {
    const item1Variant = { ...item1, size: "L", color: "Red" } as CartItem;
    vi.mocked(CartContext.useCartContext).mockReturnValue({
      cartItems: [item1, item1Variant],
    } as any);

    render(<CartPage />);

    expect(screen.getByTestId("cart-item-1-M-Black")).toBeInTheDocument();
    expect(screen.getByTestId("cart-item-1-L-Red")).toBeInTheDocument();
  });
});
