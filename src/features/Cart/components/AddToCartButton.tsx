import Button from "../../../components/ui/Button";
import { useEffect, useState } from "react";
import { X, CheckCircle } from "lucide-react";
import type { Product } from "../../../types/productType";
import { useCartContext } from "../context/CartContext";
interface AddToCartButtonProps {
  product: Product;
  selectedSize: string | null;
  selectedColor: string | null;
  quantity: number;
}
const AddToCartButton = ({
  product,
  selectedSize,
  selectedColor,
  quantity,
}: AddToCartButtonProps) => {
  const { addToCart } = useCartContext();
  const [showSuccess, setShowSuccess] = useState(false);

  const needsSize = product.sizes.length > 1 || product.sizes[0] !== "One Size";
  const canAdd = !needsSize || selectedSize !== null;

  function handleClick() {
    if (!canAdd) return;
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  }

  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <div>
      <Button
        onClick={() => {
          handleClick();
          setShowSuccess(true);
        }}
        disabled={!canAdd}
        className=" px-6 py-2 font-medium bg-[#F85606] text-white hover:bg-[#e04d04]  disabled:opacity-40"
      >
        Add to cart
      </Button>

      {showSuccess && (
        <div className="fixed top-5 left-1/2 z-100 -translate-x-1/2">
          <div className="flex min-w-75 items-center gap-3 rounded-md bg-white px-4 py-3 shadow-xl border border-gray-200">
            <CheckCircle size={22} className="shrink-0 text-green-500" />
            <p className="flex-1 text-sm font-medium text-gray-700">
              Successfully added to cart
            </p>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
