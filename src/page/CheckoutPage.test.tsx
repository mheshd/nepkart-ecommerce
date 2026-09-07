import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import * as CartContext from "../features/Cart/context/CartContext";
import type { CartItem } from "../types/cartType";

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock("../features/Cart/context/CartContext", () => ({
  useCartContext: vi.fn(),
}));

vi.mock("../features/checkout/CheckoutForm", () => ({
  default: ({ onSubmit }: any) => (
    <button onClick={() => onSubmit({ name: "Test User" })}>Submit Form</button>
  ),
}));

vi.mock("../features/checkout/OrderSummary", () => ({
  default: ({ items }: any) => (
    <div data-testid="order-summary">{items.length} items</div>
  ),
}));

const mockBuyNowItem = {
  productId: 1,
  name: "Classic Oversized T-Shirt",
  price: 29.99,
  image: "/images/products/oversized-tshirt-1.jpg",
  size: "M",
  color: "Black",
  quantity: 1,
} as CartItem;

const mockCheckoutItems = [
  mockBuyNowItem,
  { ...mockBuyNowItem, productId: 2, name: "Trail Walking Shoes" },
] as CartItem[];

const mockCartItems = [
  { ...mockBuyNowItem, productId: 3, name: "Cart Item" },
] as CartItem[];

describe("CheckoutPage", () => {
  const navigateMock = vi.fn();
  const clearCartMock = vi.fn();

  beforeEach(() => {
    navigateMock.mockClear();
    clearCartMock.mockClear();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
    vi.mocked(CartContext.useCartContext).mockReturnValue({
      cartItems: mockCartItems,
      clearCart: clearCartMock,
    } as any);
  });

  it('Show "Nothing to check out" when there are no item', () => {
    vi.mocked(useLocation).mockReturnValue({ state: null } as any);
    vi.mocked(CartContext.useCartContext).mockReturnValue({
      cartItems: [],
      clearCart: clearCartMock,
    } as any);

    render(<CheckoutPage />);

    expect(screen.getByText("Nothing to check out.")).toBeInTheDocument();
    expect(screen.queryByTestId("order-summary")).not.toBeInTheDocument();
  });

  it("use buyNowItem when present, ignoring the checkoutitem", () => {
    vi.mocked(useLocation).mockReturnValue({
      state: { buyNowItem: mockBuyNowItem },
    } as any);

    render(<CheckoutPage />);
    expect(screen.getByTestId("order-summary")).toHaveTextContent("1 items");
  });

  it("use checkoutitem  form location.state when  buyNowItem is absent", () => {
    vi.mocked(useLocation).mockReturnValue({
      state: { checkoutItems: mockCheckoutItems },
    } as any);

    render(<CheckoutPage />);

    expect(screen.getByTestId("order-summary")).toHaveTextContent("2 items");
  });

  it('"falls back to cartItems from context when location.state has neither field', () => {
    vi.mocked(useLocation).mockReturnValue({ state: null } as any);

    render(<CheckoutPage />);

    expect(screen.getByTestId("order-summary")).toHaveTextContent("1 items");
  });

  it("call clearcart when placing order from a normal cart checkout", async () => {
    const user = userEvent.setup();

    vi.mocked(useLocation).mockReturnValue({
      state: { checkoutItems: mockCheckoutItems },
    } as any);

    render(<CheckoutPage />);

    await user.click(screen.getByRole("button", { name: "Submit Form" }));
    expect(clearCartMock).toHaveBeenCalled();
  });

  it("don't call clearcart when when placing a buyNowItem order", async () => {
    const user = userEvent.setup();

    vi.mocked(useLocation).mockReturnValue({
      state: { buyNowItem: mockBuyNowItem },
    } as any);

    render(<CheckoutPage />);
    await user.click(screen.getByText("Submit Form"));

    expect(clearCartMock).not.toHaveBeenCalled();
  });

  it("navigates to home after placing an order", async () => {
    const user = userEvent.setup();
    vi.mocked(useLocation).mockReturnValue({
      state: { checkoutItems: mockCheckoutItems },
    } as any);

    render(<CheckoutPage />);
    await user.click(screen.getByText("Submit Form"));

    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
