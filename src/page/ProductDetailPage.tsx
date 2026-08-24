// Shows one product — gallery, info, size/color selection, AddToCartButton, Buy button.

import { useNavigate, useParams } from "react-router-dom";
import ProductGallery from "../features/product/components/ProductGallery";
import { getProductBySlug } from "../services/productService";
import NotFoundPage from "./NotFoundPage";
import ProductInfo from "../features/product/components/ProductInfo";
import { useState } from "react";
import AddToCartButton from "../features/Cart/components/AddToCartButton";
import Button from "../components/ui/Button";

const ProductDetailPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();

  const product = productSlug ? getProductBySlug(productSlug) : undefined;
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product?.sizes[0] ?? null,
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <NotFoundPage />;
  }

  function decreaseQuantity() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increaseQuantity() {
    setQuantity((q) => q + 1);
  }

  const needSize = product.sizes.length > 1 || product.sizes[0] !== "One Size";
  const canBuy = !needSize || selectedSize !== null;

  function handleBuyNow() {
    if (!canBuy || !product) return;

    navigate("/checkout", {
      state: {
        buyNowItem: {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size: selectedSize,
          color: selectedColor,
          quantity,
        },
      },
    });
  }

  return (
    <main
      className="max-w-6xl mx-auto px-4 py-5  grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50 
       rounded-lg "
    >
      <ProductGallery images={product.images} name={product.name} />
      <div className=" ">
        <ProductInfo product={product} />
        {needSize && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Size</p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "primary" : "secondary"}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 border  ${
                    selectedSize === size ? "border-black" : "border-gray-300"
                  }`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}

        {product.colors.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Color</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "primary" : "secondary"}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 border  ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>
        )}
        {/* quantity */}
        <div className="flex items-center gap-3 mt-4">
          <p className="font-body text-sm font-medium text-gray-700">
            Quantity
          </p>
          <div className="flex items-center border border-gray-100 rounded-md  overflow-hidden">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-9 h-9 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              -
            </button>
            <span
              aria-live="polite"
              className="w-10 text-center text-sm font-semibold text-gray-800 border-x border-gray-200"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={increaseQuantity}
              aria-label="Increase quantity"
              className="w-9 h-9 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <AddToCartButton
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            quantity={quantity}
          />

          <Button
            type="button"
            onClick={handleBuyNow}
            disabled={!canBuy}
            className=" px-6 py-2 font-medium bg-[#26ABD4]  disabled:opacity-40"
          >
            Buy now
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
