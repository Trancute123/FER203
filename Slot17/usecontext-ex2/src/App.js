import React from "react";
import { CartProvider } from "./Cart/CartContext";
import DishesList from "./DishesList";
import Cart from "./Cart/Cart";
import NavbarMenu from "./components/NavbarMenu";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";
const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function App() {
  return (
    <CartProvider>
      <NavbarMenu />
      <HeroCarousel items={dishes} />
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <DishesList dishes={dishes} />
        <Cart />
      </div>
      <Footer />
    </CartProvider>
  );
}

export default App;
