// src/App.js
import { Routes, Route, useNavigate } from "react-router-dom";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage"; // 👈 thêm
import { FaPizzaSlice } from "react-icons/fa";

import AuthProvider, { useAuth } from "./contexts/AuthContext";
import CartProvider, { useCart } from "./contexts/CartContext";
import WishlistProvider, { useWishlist } from "./contexts/WishlistContext";
import { ToastProvider } from "./contexts/ToastContext"; // ✅ chỉ cần ToastProvider

/* Header lấy user + count từ context */
function HeaderWithCounts() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { count: cartCount } = useCart();
  const { items: wl } = useWishlist();

  return (
    <AppHeader
      brand="FoodStore"
      brandIcon={FaPizzaSlice}
      user={user}
      onSignIn={() => navigate("/login")}
      onSignOut={logout}
      onGoAccount={() => navigate("/profile")}
      onGoWishlist={() => navigate("/wishlist")}
      onGoCheckout={() => navigate("/checkout")}
      onGoCart={() => navigate("/cart")}
      cartCount={cartCount}
      wishlistCount={wl.length}
    />
  );
}

export default function App() {
  const BG = "#E8F5E9";
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <div
              style={{ minHeight: "100vh", paddingBottom: 64, background: BG }}
            >
              <HeaderWithCounts />

              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>

              <AppFooter
                text="© 2025 Recipe Lab"
                github="https://github.com/<your-username>"
              />
            </div>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
