import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "../context/CartContext";

const CartIcon = () => {
  const { cartItems } = useCartContext();

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link
      to="/cart"
      className="relative"
      aria-label={`Cart, ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
    >
      <ShoppingCart size={20} aria-hidden="true" />
      {itemCount > 0 && (
        <span
          className=" absolute -top-3 -right-2  bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center "
          aria-hidden="true"
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
