import { Link } from "react-router-dom";

import { formatCurrency } from "../../../utils/formatCurrency";

interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
}

const CartSummary = ({ itemCount, subtotal }: CartSummaryProps) => {
  const shippingFee = itemCount > 0 ? 50 : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="border rounded-md p-4 h-fit">
      <h2 className="font-semibold mb-3">Order Summary</h2>

      <div className="flex items-center justify-between text-sm mb-2">
        <span>Subtotal ({itemCount}) Items</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span>Shipping Fee</span>
        <span>{formatCurrency(shippingFee)}</span>
      </div>

      <div className="flex items-center justify-between font-medium border-t pt-2 mt-2">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <Link
        to={itemCount === 0 ? "#" : "/checkout"}
        aria-disabled={itemCount === 0}
        className={`block text-center mt-4 px-4 py-2 rounded-md text-sm font-medium ${
          itemCount === 0
            ? "bg-gray-200 text-gray-400 pointer-events-none"
            : "bg-black text-white"
        }`}
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
