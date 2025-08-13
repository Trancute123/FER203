import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import RecipeGrid from "./components/RecipeGrid";
import FavoritesPage from "./components/FavoritesPage";
import RecipeModal from "./components/RecipeModal";
import HeroSection from "./components/HeroSection";
import HeroCarousel from "./components/HeroCarousel";
import AboutPage from "./components/AboutPage";
import recipes from "./data/recipes";

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(6);

  // ✅ Đổi màu nền toàn trang
  useEffect(() => {
    document.body.style.backgroundColor = "#e6f4e6"; // xanh lá nhạt
    return () => {
      document.body.style.backgroundColor = null; // reset khi unmount
    };
  }, []);

  const handleAddToFavorites = (recipe) => {
    if (!favorites.find((f) => f.title === recipe.title)) {
      setFavorites((prev) => [...prev, recipe]);
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  return (
    <Router>
      <AppNavbar favCount={favorites.length} cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <HeroCarousel items={recipes} />
              <div className="container py-4">
                <RecipeGrid
                  items={recipes}
                  onAddToFavorites={handleAddToFavorites}
                  onAddToCart={handleAddToCart}
                  onViewRecipe={handleViewRecipe}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                />
              </div>
            </>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/favorites"
          element={
            <div className="container py-4">
              <FavoritesPage
                items={favorites}
                onViewRecipe={handleViewRecipe}
              />
            </div>
          }
        />
      </Routes>

      <RecipeModal
        show={modalOpen}
        recipe={selectedRecipe}
        onAddToCart={handleAddToCart}
        onHide={() => setModalOpen(false)}
      />
    </Router>
  );
}
