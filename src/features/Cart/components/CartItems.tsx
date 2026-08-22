// 	One row in the cart — image, name, quantity control, remove button.
import type { CartItem } from "../../../types/cartType";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useCartContext } from "../context/CartContext";
import Checkbox from "../../../components/ui/Checkbox";

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
    <div className="flex gap-4 py-4 border-b">
      <Checkbox
        checked={checked}
        onChange={onToggleSelect}
        aria-label={`Select ${item.name} for checkout`}
      />
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="flex-1">
        <span className="block font-medium">{item.name}</span>
        {item.size && (
          <span className="block text-sm text-gray-500">Size: {item.size}</span>
        )}
        {item.color && (
          <span className="block text-sm text-gray-500">
            Color: {item.color}
          </span>
        )}
        <span className="block text-sm text-gray-500">
          {formatCurrency(item.price)}
        </span>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border rounded-md">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="px-2"
            >
              −
            </button>
            <span aria-live="polite" className="px-2">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={increaseQuantity}
              aria-label="Increase quantity"
              className="px-2"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="text-sm text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
      <span className="font-medium">
        {formatCurrency(item.price * item.quantity)}
      </span>
    </div>
  );
};

export default CartItems;
