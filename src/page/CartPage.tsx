//  list the cartitem , show cartsummary

import { useState } from "react";
import CartItems from "../features/Cart/components/CartItems";
import CartSummary from "../features/Cart/components/CartSummary";
import { useCartContext } from "../features/Cart/context/CartContext";
import type { CartItem as CartItemType } from "../types/cartType";

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

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const selectedItems = cartItems.filter((item) =>
    selectedKeys.has(getItemKey(item)),
  );
  const itemCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4 py-8">
      <div className="md:col-span-2">
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
