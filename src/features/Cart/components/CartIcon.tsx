import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CartIcon = () => {
  return (
    <Link to="/cart" className="relative">
      <ShoppingCart size={20} aria-hidden="true" />
    </Link>
  );
};

export default CartIcon;
