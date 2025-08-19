import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ import đúng với cấu trúc mới
import AppNavbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import Footer from "./components/layout/Footer";

import StudentsPage from "./pages/StudentsPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #d6eaff, #f0f8ff)", // nền pastel
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
