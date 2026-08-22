import { useLocation, useNavigate } from "react-router-dom";
import CheckoutForm, {
  type ShippingDetails,
} from "../features/checkout/CheckoutForm";
import type { CartItem } from "../types/cartType";
import { useCartContext } from "../features/Cart/context/CartContext";
import OrderSummary from "../features/checkout/OrderSummary";

interface CheckoutState {
  buyNowItem?: CartItem;
  checkoutItems?: CartItem[];
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartContext();

  const state = location.state as CheckoutState | null;
  const items: CartItem[] = state?.buyNowItem
    ? [state.buyNowItem]
    : (state?.checkoutItems ?? cartItems);

  function handlePlaceOrder(details: ShippingDetails) {
    console.log("Order placed:", { details, items });
    if (!state?.buyNowItem) {
      clearCart();
    }

    navigate("/");
  }

  if (items.length === 0) {
    return <p className="p-8">Nothing to check out.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <CheckoutForm onSubmit={handlePlaceOrder} />
      </div>
      <OrderSummary items={items} />
    </div>
  );
};

export default CheckoutPage;
