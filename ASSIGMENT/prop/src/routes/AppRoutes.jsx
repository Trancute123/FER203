import { Route, Routes, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ProductsPage from '../pages/ProductsPage';
import ProductDetails from '../pages/ProductDetails.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from "../pages/RegisterPage";

export default function AppRoutes() {
  const { user } = useAuth();
  const requireAuth = (element) => user ? element : <Navigate to="/login" replace />;
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/products" element={requireAuth(<ProductsPage />)} />
      <Route path="/view/:id" element={requireAuth(<ProductDetails />)} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
