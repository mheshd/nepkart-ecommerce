import type { CartItem } from "../../types/cartType";
import { formatCurrency } from "../../utils/formatCurrency";

interface OrderSummaryProps {
  items: CartItem[];
}

const SHIPPING_FEE = 50;

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal + SHIPPING_FEE;
  return (
    <div className="border rounded-md p-4 h-fit  py-26">
      <h2 className="font-semibold mb-3">Order Summary</h2>

      <div className="space-y-3 mb-4">
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

      <div className="border-t pt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>{formatCurrency(SHIPPING_FEE)}</span>
        </div>
        <div className="flex justify-between font-semibold border-t pt-2">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
