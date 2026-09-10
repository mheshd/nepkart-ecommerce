import type { CartItem } from "../../types/cartType";
import { formatCurrency } from "../../utils/formatCurrency";

interface CheckoutItemsProps {
  items: CartItem[];
}

const CheckoutItems = ({ items }: CheckoutItemsProps) => {
  return (
    <div className="">
      <h2 className="font-heading font-semibold mb-4">Order Items</h2>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.size}-${item.color}`}
            className="flex gap-3"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-md"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              {item.size && (
                <p className="text-xs text-gray-500">Size: {item.size}</p>
              )}
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-medium">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutItems;
