import { useLocation, useNavigate } from "react-router-dom";
import type { CartItem } from "../types/cartType";
import { useCartContext } from "../features/Cart/context/CartContext";
import OrderSummary from "../features/checkout/OrderSummary";
import CheckoutSection from "../features/checkout/CheckoutSection";
import { useEffect, useState } from "react";
import type { Address } from "../types/addressType";

interface CheckoutState {
  buyNowItem?: CartItem;
  checkoutItems?: CartItem[];
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCartContext();

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const stored = localStorage.getItem("checkout");
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [addressError, setAddressError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("checkout", JSON.stringify(addresses));
  }, [addresses]);

  // first/only address is always auto-selected
  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  const state = location.state as CheckoutState | null;
  const items: CartItem[] = state?.buyNowItem
    ? [state.buyNowItem]
    : (state?.checkoutItems ?? cartItems);

  function handlePlaceOrder() {
    if (!selectedAddressId) {
      setAddressError("You have not set a billing address yet.");
      return;
    }
    setAddressError(null);
    navigate("/payment");
  }

  if (items.length === 0) {
    return <p className="p-8">Nothing to check out.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <CheckoutSection
          items={items}
          addresses={addresses}
          setAddresses={setAddresses}
          selectedAddressId={selectedAddressId}
          setSelectedAddressId={setSelectedAddressId}
        />

        {addressError && (
          <p role="alert" className="text-sm text-red-500 mt-2">
            {addressError}
          </p>
        )}
      </div>
      <OrderSummary items={items} onSubmit={handlePlaceOrder} />
    </div>
  );
};

export default CheckoutPage;
