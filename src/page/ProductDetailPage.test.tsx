import ProductDetailPage from "./ProductDetailPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlug } from "../services/productService";
import type { Product } from "../types/productType";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock("../services/productService", () => ({
  getProductBySlug: vi.fn(),
}));

vi.mock("../features/product/components/ProductGallery", () => ({
  default: ({ name }: any) => <div data-testid="product-gallery">{name}</div>,
}));

vi.mock("../features/product/components/ProductInfo", () => ({
  default: ({ product }: any) => (
    <div data-testid="product-info">{product.name}</div>
  ),
}));

vi.mock("../features/Cart/components/AddToCartButton", () => ({
  default: () => <button>Add to cart (mocked)</button>,
}));

vi.mock("./NotFoundPage", () => ({
  default: () => <div data-testid="not-found-page">Not Found</div>,
}));
const mockProduct = {
  id: 1,
  name: "Classic Oversized T-Shirt",
  slug: "classic-oversized-t-shirt",
  price: 29.99,
  images: ["/images/products/oversized-tshirt-1.jpg"],
  sizes: ["S", "M", "L"],
  colors: ["Black", "White"],
  brand: "NOVA",
  category: "clothing",
  rating: 4.6,
  reviewCount: 128,
  description: "A relaxed oversized t-shirt.",
  tags: ["bestseller"],
} as Product;

const mockOneSizeProduct = { ...mockProduct, sizes: ["One Size"] } as Product;
const mockNoSizeProduct = { ...mockProduct, sizes: [] } as Product;
const mockNoColorProduct = { ...mockProduct, colors: [] } as Product;

describe("ProductDetailPage", () => {
  const navigateMock = vi.fn();
  beforeEach(() => {
    navigateMock.mockClear();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
    vi.mocked(useParams).mockReturnValue({
      productSlug: "classic-oversized-t-shirt",
    } as any);
    vi.mocked(getProductBySlug).mockReturnValue(mockProduct);
  });

  it("renders product details when productSlug matches an existing product", () => {
    render(<ProductDetailPage />);

    expect(screen.getByTestId("product-gallery")).toHaveTextContent(
      "Classic Oversized T-Shirt",
    );
    expect(screen.getByTestId("product-info")).toHaveTextContent(
      "Classic Oversized T-Shirt",
    );
  });

  it("renders NotFoundPage when no product matches the slug", () => {
    vi.mocked(getProductBySlug).mockReturnValue(undefined);
    render(<ProductDetailPage />);

    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });

  //   qunatity

  it("increases quantity when Increase quantity button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage />);

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("decreases quantity when Decrease quantity button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage />);

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("disables Decrease quantity button when quantity is 1", () => {
    render(<ProductDetailPage />);
    expect(
      screen.getByRole("button", { name: "Decrease quantity" }),
    ).toBeDisabled();
  });

  //   buy now
  it("navigates to /checkout with buyNowItem payload when Buy now is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage />);

    await user.click(screen.getByRole("button", { name: "Buy now" }));

    expect(navigateMock).toHaveBeenCalledWith("/checkout", {
      state: {
        buyNowItem: {
          productId: 1,
          name: "Classic Oversized T-Shirt",
          price: 29.99,
          image: "/images/products/oversized-tshirt-1.jpg",
          size: "S",
          color: null,
          quantity: 1,
        },
      },
    });
  });

  it("disables Buy now button when size is required but not selected", () => {
    vi.mocked(getProductBySlug).mockReturnValue(mockNoSizeProduct);
    render(<ProductDetailPage />);
    expect(screen.getByRole("button", { name: "Buy now" })).toBeDisabled();
  });

  it("enables Buy now button when size is required and selected", () => {
    render(<ProductDetailPage />);

    expect(screen.getByRole("button", { name: "Buy now" })).toBeEnabled();
  });

  it("enables Buy now button when product only has One Size", () => {
    vi.mocked(getProductBySlug).mockReturnValue(mockOneSizeProduct);
    render(<ProductDetailPage />);
    expect(screen.getByRole("button", { name: "Buy now" })).toBeEnabled();
  });

  it("does not navigate when Buy now is disabled ", async () => {
    const user = userEvent.setup();
    vi.mocked(getProductBySlug).mockReturnValue(mockNoSizeProduct);

    render(<ProductDetailPage />);

    await user.click(screen.getByRole("button", { name: "Buy now" }));
    expect(navigateMock).not.toHaveBeenCalled();
  });

  //   size

  it("defaults selectedSize to the first available size when product has sizes", () => {
    render(<ProductDetailPage />);
    expect(screen.getByRole("button", { name: "S" })).toHaveClass(
      "border-black",
    );
  });

  it("applies selected styling to the clicked size button", async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage />);

    const mButton = screen.getByRole("button", { name: "M" });
    await user.click(mButton);
    expect(mButton).toHaveClass("border-black");
    expect(screen.getByRole("button", { name: "S" })).toHaveClass(
      "border-gray-300",
    );
  });

  it("does not render color section when product has no colors", () => {
    vi.mocked(getProductBySlug).mockReturnValue(mockNoColorProduct);

    render(<ProductDetailPage />);

    expect(screen.queryByText("Color")).not.toBeInTheDocument();
  });

  it("applies selected styling to the clicked color button", async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage />);

    const blackButton = screen.getByRole("button", { name: "Black" });
    await user.click(blackButton);

    expect(blackButton).toHaveClass("border-black");
    expect(screen.getByRole("button", { name: "White" })).toHaveClass(
      "border-gray-300",
    );
  });
});
