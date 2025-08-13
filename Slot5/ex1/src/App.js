import React, { useState } from "react";
import AppNavbar from "./components/AppNavbar";
import Hero from "./components/Hero";
import RecipeGrid from "./components/RecipeGrid";
import Footer from "./components/Footer";
import recipes from "./data/recipes";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const handleAddToCart = () => setCartCount((c) => c + 1);

  return (
    <div style={{ backgroundColor: "#f8f1e7", minHeight: "100vh" }}>
      <AppNavbar cartCount={cartCount} />
      <Hero />
      <div className="border-top" style={{ borderColor: "rgba(0,0,0,.08)" }} />
      <section className="py-4">
        <div className="container">
          <RecipeGrid items={recipes} onAddToCart={handleAddToCart} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
