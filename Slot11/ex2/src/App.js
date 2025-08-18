import React, { useState } from "react";
import AppNavbar from "./components/Navbar";
import Hero from "./components/Hero";
import StudentsPage from "./pages/StudentsPage";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #d6eaff, #f0f8ff)", // ✅ nền pastel
        minHeight: "100vh",  // phủ toàn màn hình
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppNavbar onSearch={setSearchQuery} />
      <Hero />
      <div style={{ flex: 1 }}>
        <StudentsPage searchQuery={searchQuery} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
