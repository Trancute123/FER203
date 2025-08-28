import { Route, Routes } from "react-router-dom";
import ProduductsPage from "../pages/ProductsPage";
import ProductDetails from "../pages/ProductDetails";
import LoginPage from "../pages/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProduductsPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
