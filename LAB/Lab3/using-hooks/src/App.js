import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import Footer from "./components/layout/Footer";
import StudentsPage from "./pages/StudentsPage";
import ProfileWizardModal from "./ProfileWizard/ProfileWizardModal";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div style={{
      background: "linear-gradient(120deg, #d6eaff, #f0f8ff)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <AppNavbar
        onSearch={setSearchQuery}
        onOpenProfile={() => setShowProfile(true)}   // <-- mở modal
      />
      <Hero />
      <div style={{ flex: 1 }}>
        <StudentsPage searchQuery={searchQuery} />
      </div>
      <Footer />

      {/* Modal wizard */}
      <ProfileWizardModal
        show={showProfile}
        onHide={() => setShowProfile(false)}
      />
    </div>
  );
}

export default App;
