import React, { useState, useEffect } from "react";
import { CartProvider } from "./Cart/CartContext";
import DishesList from "./DishesList";
import Cart from "./Cart/Cart";
import NavbarMenu from "./components/NavbarMenu";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";

const dishes = [
  { id: 0, name: "Uthappizza", image: "images/uthappizza.png", price: "4.99", description: "A unique combination of Indian Uthappam and Italian pizza." },
  { id: 1, name: "Zucchipakoda", image: "images/zucchipakoda.png", price: "1.99", description: "Deep fried Zucchini with chickpea batter." },
  { id: 2, name: "Vadonut", image: "images/vadonut.png", price: "1.99", description: "A combination of vada and donut." },
  { id: 3, name: "ElaiCheese Cake", image: "images/elaicheesecake.png", price: "2.99", description: "New York Style Cheesecake with Indian cardamoms." },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);

  // Gắn theme lên <html data-theme="..."> để toàn trang dùng được
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const filteredDishes = dishes.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CartProvider>
      <NavbarMenu isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)} />
      <HeroCarousel items={dishes} />

      <main style={{ padding: 20, paddingTop: 76 }}>
        {/* Search */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              width: 280,
              fontSize: 14,
              outline: "none",
              background: "var(--card)",
              color: "var(--text)"
            }}
          />
        </div>

        {/* Dishes */}
        <section id="dishes-section">
          <DishesList dishes={filteredDishes} />
        </section>

        {/* Cart */}
        <section id="cart-section">
          <Cart />
        </section>
      </main>

      <Footer />

      {/* ====== Global theme variables: Light / Dark ====== */}
      <style>{`
        :root[data-theme="light"]{
          --bg:#f6fbf6;
          --text:#0f1720;
          --muted:#697586;
          --card:#ffffff;
          --border:#e5e7eb;
          --nav:#2e7d32;          /* navbar xanh lá */
          --primary:#2e7d32;
          --primary-600:#1b5e20;
          --accent:#4caf50;
          --danger:#c62828;
          --shadow:0 10px 22px rgba(0,0,0,.12);
        }
        :root[data-theme="dark"]{
          --bg:#0b0e11;
          --text:#e7edf5;
          --muted:#9aa4b2;
          --card:#161a1e;
          --border:#2a3139;
          --nav:#1b5e20;          /* đậm hơn */
          --primary:#2e7d32;
          --primary-600:#134a15;
          --accent:#4caf50;
          --danger:#f44336;
          --shadow:0 10px 22px rgba(0,0,0,.45);
        }
        html, body { background: var(--bg); color: var(--text); }
        /* Một số class chung để các component tự hưởng theme */
        .card, .cart-card { background: var(--card) !important; color: var(--text); }
        .text-muted { color: var(--muted) !important; }
      `}</style>
    </CartProvider>
  );
}
