import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavbarMenu({ isDark, onToggleTheme }) {
  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "var(--nav)" }} variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: "bold", color: "#fff" }}>
            🍕 FoodStore
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <div className="d-flex gap-2 me-4">
                <button className="nav-btn" onClick={() => document.getElementById("dishes-section").scrollIntoView({ behavior: "smooth" })}>
                  Dishes
                </button>
                <button className="nav-btn" onClick={() => document.getElementById("cart-section").scrollIntoView({ behavior: "smooth" })}>
                  Cart
                </button>
              </div>

              <button className="theme-btn" onClick={onToggleTheme}>
                {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style>{`
        .nav-btn{
          background: var(--accent);
          color:#fff; border:none; border-radius:10px;
          padding:8px 16px; font-size:14px; font-weight:800; cursor:pointer;
          transition:.2s ease; box-shadow:0 2px 6px rgba(0,0,0,.15);
        }
        .nav-btn:hover{ filter:brightness(.95); }
        .theme-btn{
          background: transparent; color:#fff; border:2px solid rgba(255,255,255,.75);
          border-radius:12px; padding:8px 14px; font-weight:800; letter-spacing:.2px;
          transition:.2s ease;
        }
        .theme-btn:hover{ border-color:#fff; transform:translateY(-1px); }
      `}</style>
    </>
  );
}
