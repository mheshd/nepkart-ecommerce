import Button from "../../../components/ui/Button";
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

  return (
    <div>
      <Button
        onClick={handleClick}
        disabled={!canAdd}
        className=" px-6 py-2 font-medium bg-[#F85606] text-white hover:bg-[#e04d04]  disabled:opacity-40"
      >
        Add to cart
      </Button>
    </div>
  );
};

export default AddToCartButton;
