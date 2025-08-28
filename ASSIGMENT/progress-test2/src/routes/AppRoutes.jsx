import { Route, Routes } from "react-router-dom";
import ProduductsPage from "../pages/ProductsPage";
import ProductDetails from "../pages/ProductDetails";
import LoginPage from "../pages/LoginPage";
import FavouritesPage from "../pages/FavouritesPage";
import CartPage from "../pages/CartPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProduductsPage />} />
     <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />{" "}
         <Route path="/cart" element={<CartPage />} />  
       <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
