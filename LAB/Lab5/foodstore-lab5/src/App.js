import React from "react";
import NavbarMenu from "./components/NavbarMenu";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavouritesProvider>
            {/* Layout cột full height */}
            <div className="app-layout">
              <NavbarMenu />
              <main className="app-main">
                <AppRoutes />
              </main>
              <footer className="app-footer">
                © 2025 FoodStore. All rights reserved.
              </footer>
            </div>
          </FavouritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
