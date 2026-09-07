import type { CartItem } from "../../../types/cartType";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useCartContext } from "../context/CartContext";
import Checkbox from "../../../components/ui/Checkbox";
import { Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";

interface CartItemProps {
  item: CartItem;
  checked: boolean;
  onToggleSelect: () => void;
}

const CartItems = ({ item, checked, onToggleSelect }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCartContext();

  function decreaseQuantity() {
    updateQuantity(item.productId, item.size, item.color, item.quantity - 1);
  }

  function increaseQuantity() {
    updateQuantity(item.productId, item.size, item.color, item.quantity + 1);
  }

  function handleRemove() {
    removeFromCart(item.productId, item.size, item.color);
  }

  return (
    <div
      className="flex flex-col sm:flex-row gap-2  sm:items-center w-full p-3 sm:p-4 border
       border-gray-100    rounded-lg transition-shadow hover:shadow-md bg-white "
    >
      <div className=" flex gap-5 items-center">
        <Checkbox
          checked={checked}
          onChange={onToggleSelect}
          aria-label={`Select ${item.name} for checkout`}
        />
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 sm:w-24 sm:h-24  object-cover  aspect-auto rounded-md"
        />
      </div>

      <div className="flex-1  flex flex-col  gap-1">
        <span className="font-body font-medium text-gray-800">{item.name}</span>

        <div className="flex flex-wrap gap-x-3 text-sm text-gray-500">
          {item.size && <span>Size: {item.size}</span>}
          {item.color && <span>Color: {item.color}</span>}
        </div>

        <span className="text-sm text-gray-500">
          {formatCurrency(item.price)}{" "}
        </span>

        <div className="flex items-center  mt-2 ">
          <div className="flex items-center gap-5 ">
            <Button
              type="button"
              variant="pill"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </Button>
            <span aria-live="polite" className="text-lg font-body ">
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="pill"
              onClick={increaseQuantity}
              aria-label="Increase quantity"
              className=" text-lg font-body bg-gray-100  rounded-full px-2 cursor-pointer"
            >
              +
            </Button>
          </div>
        </div>
      </div>

      {/* righ side */}
      <div
        className=" flex sm:flex-col items-center sm:items-end justify-between
       sm:justify-center gap-2 sm:gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100  "
      >
        <span className="font-body  text-[#F85606] text-base">
          {formatCurrency(item.price * item.quantity)}
        </span>

        <button
          type="button"
          onClick={handleRemove}
          aria-label="remove-button"
          className=" text-gray-400 hover:text-red-600 cursor-pointer"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItems;
