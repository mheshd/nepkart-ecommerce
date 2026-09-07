import AddToCartButton from "./AddToCartButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as CartContext from "../context/CartContext";
import type { Product } from "../../../types/productType";

vi.mock("../context/CartContext", () => ({
  useCartContext: vi.fn(),
}));

const mockProduct = {
  id: 1,
  name: "Classic Oversized T-Shirt",
  price: 29.99,
  images: ["/images/products/oversized-tshirt-1.jpg"],
  sizes: ["S", "M", "L"],
} as Product;

describe("AddToCartButton", () => {
  const addToCartMock = vi.fn();

  beforeEach(() => {
    addToCartMock.mockClear();
    vi.mocked(CartContext.useCartContext).mockReturnValue({
      addToCart: addToCartMock,
    } as any);
  });

  it("renders a add to cart button", () => {
    render(
      <AddToCartButton
        product={mockProduct}
        selectedSize="M"
        selectedColor="Red"
        quantity={1}
      />,
    );
    expect(screen.getByText("Add to cart")).toBeInTheDocument();
  });
  it("call addToCart with correct payload when clicked", async () => {
    const user = userEvent.setup();
    render(
      <AddToCartButton
        product={mockProduct}
        selectedSize="M"
        selectedColor="Red"
        quantity={1}
      />,
    );
    await user.click(screen.getByText("Add to cart"));
    expect(addToCartMock).toHaveBeenCalledWith({
      productId: 1,
      name: "Classic Oversized T-Shirt",
      price: 29.99,
      image: "/images/products/oversized-tshirt-1.jpg",
      size: "M",
      color: "Red",
      quantity: 1,
    });
  });

  it("disables the button when size is required but not selected", () => {
    render(
      <AddToCartButton
        product={mockProduct}
        selectedSize={null}
        selectedColor="Red"
        quantity={1}
      />,
    );
    const button = screen.getByRole("button", { name: "Add to cart" });
    expect(button).toBeDisabled();
  });

  it("enables the button when size is required and selected", () => {
    render(
      <AddToCartButton
        product={mockProduct}
        selectedSize="M"
        selectedColor="Red"
        quantity={1}
      />,
    );
    const button = screen.getByRole("button", { name: "Add to cart" });
    expect(button).toBeEnabled();
  });

  it('enables the button when size is "One Size"', () => {
    const oneSizeProduct = {
      ...mockProduct,
      sizes: ["One Size"],
    } as Product;
    render(
      <AddToCartButton
        product={oneSizeProduct}
        selectedSize={null}
        selectedColor="Red"
        quantity={1}
      />,
    );
    const button = screen.getByRole("button", { name: "Add to cart" });
    expect(button).toBeEnabled();
  });
});
