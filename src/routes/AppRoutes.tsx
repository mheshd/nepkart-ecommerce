// all <Route> definitions in one place

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../page/Homepage";
import ProductListingPage from "../page/ProductListingPage";
import NotFoundPage from "../page/NotFoundPage";
import ProductDetailPage from "../page/ProductDetailPage";
import { CartProvider } from "../features/Cart/context/CartContext";
import CartPage from "../page/CartPage";
import CheckoutPage from "../page/CheckoutPage";
import AppLayout from "../components/layout/AppLayout";
const AppRoutes = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route
              path="/category/:categorySlug"
              element={<ProductListingPage />}
            />
            <Route path="/brands/:brandSlug" element={<ProductListingPage />} />
            <Route
              path="/product/:productSlug"
              element={<ProductDetailPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </CartProvider>
  );
};

export default AppRoutes;
