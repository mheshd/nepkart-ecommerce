import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../page/Homepage";
import { CartProvider } from "../features/Cart/context/CartContext";
import AppLayout from "../components/layout/AppLayout";
import { AuthProvider } from "../features/auth/context/AuthContext";
import Loading from "../components/ui/Loading";

const ProductListingPage = lazy(() => import("../page/ProductListingPage"));
const ProductDetailPage = lazy(() => import("../page/ProductDetailPage"));
const CartPage = lazy(() => import("../page/CartPage"));
const CheckoutPage = lazy(() => import("../page/CheckoutPage"));
const LoginPage = lazy(() => import("../page/LoginPage"));
const SignupPage = lazy(() => import("../page/SignupPage"));
const ForgotPasswordPage = lazy(
  () => import("../features/auth/components/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("../features/auth/components/ResetPasswordPage"),
);
const NotFoundPage = lazy(() => import("../page/NotFoundPage"));
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppLayout>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Homepage />} />

                <Route
                  path="/category/:categorySlug"
                  element={<ProductListingPage />}
                />
                <Route
                  path="/brands/:brandSlug"
                  element={<ProductListingPage />}
                />
                <Route
                  path="/product/:productSlug"
                  element={<ProductDetailPage />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </AppLayout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
