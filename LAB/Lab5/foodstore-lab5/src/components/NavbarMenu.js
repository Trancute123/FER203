// src/components/NavbarMenu.jsx
import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useFav } from "../context/FavouritesContext";
import { useAuth } from "../context/AuthContext";

export default function NavbarMenu() {
  const { isDark, toggleTheme } = useTheme();
  const { cartItems } = useCart();
  const { favourites } = useFav();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.username || user?.email || "Account";

  const doLogout = () => {
    logout();
    navigate("/", { replace: true }); // ➜ về Home sau khi logout
  };

  return (
    <Navbar expand="lg" className="app-navbar" variant="dark" fixed="top">
      <Container>
        {/* Brand luôn về Home */}
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold", color: "#fff" }}>
          🍕 FoodStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {/* LEFT: menu chính */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            {user && (
              <Nav.Link as={NavLink} to="/favourites">
                My Favourites
              </Nav.Link>
            )}
          </Nav>

          {/* RIGHT */}
          <Nav className="ms-auto align-items-center gap-2">
            {/* Theme switch */}
            <button className="theme-btn" onClick={toggleTheme}>
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* Favourites icon chỉ khi login */}
            {user && (
              <Nav.Link as={NavLink} to="/favourites" className="position-relative" aria-label="Favourites">
                <FaHeart />
                {favourites.length > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {favourites.length}
                  </Badge>
                )}
              </Nav.Link>
            )}

            {/* Cart icon luôn hiển thị */}
            <Nav.Link as={NavLink} to="/cart" className="position-relative" aria-label="Cart">
              <FaShoppingCart />
              {cartItems.length > 0 && (
                <Badge
                  bg="success"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>

            {/* Account area */}
            {user ? (
              <NavDropdown align="end" title={<span><FaUser /> {displayName}</span>}>
                <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={doLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-2">
                <Button as={Link} to="/register" variant="outline-light">Register</Button>
                <Button as={Link} to="/login" variant="light">Login</Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
