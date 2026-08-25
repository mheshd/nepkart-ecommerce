import Button from "../../components/ui/Button";
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
    <div className=" bg-white shadow-md rounded-sm px-8 sm:px-6 h-fit  sm:py-8 py-6 ">
      <h2 className="font-semibold mb-5">Order Summary</h2>

      <div className="  mb-4 px-4 sm:px-2">
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

      <div className="border-t border-gray-300 pt-3 space-y-3 text-sm px-4 sm:px-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>{formatCurrency(SHIPPING_FEE)}</span>
        </div>

        <div className="flex justify-between font-semibold border-t border-gray-300 pt-3 px-4 sm:px-2">
          <span className="font-body ">Total</span>
          <span className="text-[#F57224]">{formatCurrency(total)}</span>
        </div>
        <Button
          type="submit"
          className=" w-full  px-8 py-2.5 font-medium bg-[#F57224]"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
