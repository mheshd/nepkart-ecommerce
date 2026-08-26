import CartIcon from "../../features/Cart/components/CartIcon";
import Logo from "./Logo";
import CategoryList from "../../features/category/CategoryList";
import SearchBar from "../../features/search/components/SearchBar";
import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  return (
    <nav className=" fixed top-0 left-0 w-full bg-gray-50  z-50  ">
      <div className=" flex items-center  justify-between gap-5 px-5 py-1   max-w-6xl mx-auto ">
        <div className=" hidden sm:flex gap-10 items-center ">
          <Logo />
          <button className="hidden sm:inline  font-body">categories</button>
        </div>

        <SearchBar />

        <div className=" hidden sm:flex gap-10 items-center relative   ">
          <CartIcon />
          <AccountMenu variant="desktop" />
        </div>
      </div>

      <div className="border-b border-gray-200 shadow-2xl" />

      <div className=" hidden sm:block bg-white border-b border-gray-200 py-1 ">
        <div className="max-w-6xl mx-auto   ">
          <CategoryList />
        </div>
      </div>
      {/* category mobile popup */}

      {showMobileCategories && (
        <div
          className="sm:hidden fixed bottom-19 left-0 w-full bg-white border-t border-gray-200
         shadow-2xl max-h-[60vh] overflow-y-auto z-40"
        >
          <CategoryList onSelect={() => setShowMobileCategories(false)} />
        </div>
      )}
      {/* bottom tab bar mobile only */}
      <div
        className="sm:hidden fixed bottom-0 left-0 w-full bg-gray-50 border-t border-gray-200 
      flex items-center justify-around py-2 z-50"
      >
        <Logo />
        <button
          onClick={() => setShowMobileCategories((prev) => !prev)}
          className="flex flex-col items-center text-xs gap-1"
        >
          <LayoutGrid size={22} />
          Categories
        </button>

        <div className="flex flex-col items-center text-xs gap-1">
          <CartIcon />
          Cart
        </div>
        <AccountMenu variant="mobile" />
      </div>
    </nav>
  );
};

export default Navbar;
