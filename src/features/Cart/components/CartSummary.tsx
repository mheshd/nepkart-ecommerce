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
    <div className=" bg-white shadow-md  rounded-lg px-4 py-6 h-fit space-y-5">
      <h2 className="font-semibold font-heading mb-3">Order Summary</h2>
      <div className="border-t border-gray-200" />

      <div className="flex items-center justify-between text-sm ">
        <span className="font-body text-gray-700">
          Subtotal ({itemCount}) Items
        </span>
        <span className="font-body text-[#F85606] text-base">
          {formatCurrency(subtotal)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm ">
        <span className=" font-body text-gray-700">Shipping Fee</span>
        <span className="font-body text-[#F85606] text-base">
          {formatCurrency(shippingFee)}
        </span>
      </div>

      <div className="flex items-center justify-between font-medium border-t border-gray-200 pt-2 mt-2">
        <span className="  font-body">Total</span>
        <span className="font-body text-[#F85606] text-base">
          {formatCurrency(total)}
        </span>
      </div>

      <Link
        to={itemCount === 0 ? "#" : "/checkout"}
        aria-disabled={itemCount === 0}
        className={`block text-center mt-4 px-4 py-2 rounded-md text-sm font-medium ${
          itemCount === 0
            ? "bg-gray-200 text-gray-400 pointer-events-none"
            : "bg-[#5FA1ED] text-white hover:bg-[#e04d04]"
        }`}
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
