import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/CartPage";
import FavouritesPage from "../pages/FavouritesPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Checkout from "../pages/Checkout";
import { RequireAuth, PublicOnly } from "./guards";

export default function AppRoutes(){
  return (
    <Routes>
      {/*  Ai cũng xem được */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />

      {/*  Cần đăng nhập mới vào */}
      <Route path="/favourites" element={<RequireAuth><FavouritesPage/></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>} />
      <Route path="/checkout" element={<RequireAuth><Checkout/></RequireAuth>} />

      {/*  Login/Register chỉ hiển thị khi chưa đăng nhập */}
      <Route path="/login" element={<PublicOnly><Login/></PublicOnly>} />
      <Route path="/register" element={<PublicOnly><Register/></PublicOnly>} />

      {/* Fallback về Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
