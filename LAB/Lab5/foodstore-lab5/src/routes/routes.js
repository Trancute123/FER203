import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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
      {/* Public-only */}
      <Route path="/login" element={<PublicOnly><Login/></PublicOnly>} />
      <Route path="/register" element={<PublicOnly><Register/></PublicOnly>} />

      {/* Private */}
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<RequireAuth><Products/></RequireAuth>} />
      <Route path="/products/:id" element={<RequireAuth><ProductDetails/></RequireAuth>} />
      <Route path="/cart" element={<RequireAuth><CartPage/></RequireAuth>} />
      <Route path="/favourites" element={<RequireAuth><FavouritesPage/></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>} />
      <Route path="/checkout" element={<RequireAuth><Checkout/></RequireAuth>} />

      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
}
