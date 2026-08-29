import { useState } from "react";
import CartItems from "../features/Cart/components/CartItems";
import CartSummary from "../features/Cart/components/CartSummary";
import { useCartContext } from "../features/Cart/context/CartContext";
import type { CartItem as CartItemType } from "../types/cartType";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Checkbox from "../components/ui/Checkbox";

function getItemKey(item: CartItemType) {
  return `${item.productId}-${item.size}-${item.color}`;
}

const CartPage = () => {
  const { cartItems } = useCartContext();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  function toggleSelect(key: string) {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  const allKeys = cartItems.map(getItemKey);

  const allSelected =
    allKeys.length > 0 && allKeys.every((key) => selectedKeys.has(key));

  function toggleSelectAll() {
    setSelectedKeys(allSelected ? new Set() : new Set(allKeys));
  }

  const selectedItems = cartItems.filter((item) =>
    selectedKeys.has(getItemKey(item)),
  );
  const itemCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-24">
        <ShoppingCart
          size={48}
          className="text-gray-300 mb-4"
          aria-hidden="true"
        />
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-md bg-black text-white text-sm font-semibold"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4 py-8">
      <div className="md:col-span-2  flex  flex-col gap-2 ">
        <h1 className="font-heading text-2xl text-gray-700 mb-2">
          Shopping Cart
        </h1>

        <div className="flex items-center gap-2 pb-2 border-b border-gray-100 mb-2">
          <Checkbox
            checked={allSelected}
            onChange={toggleSelectAll}
            label={`Select all (${cartItems.length})`}
          />
        </div>

        {cartItems.map((item) => {
          const key = getItemKey(item);
          return (
            <CartItems
              key={key}
              item={item}
              checked={selectedKeys.has(key)}
              onToggleSelect={() => toggleSelect(key)}
            />
          );
        })}
      </div>

      <CartSummary itemCount={itemCount} subtotal={subtotal} />
    </div>
  );
};

export default CartPage;
