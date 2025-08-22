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

  const doLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Navbar
      expand="lg"
      className="app-navbar"   // ép nền xanh lá bằng CSS
      variant="dark"
      fixed="top"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to={user ? "/" : "/login"}
          style={{ fontWeight: "bold", color: "#fff" }}
        >
          🍕 FoodStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {/* LEFT: menu chính chỉ khi đã login */}
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                <Nav.Link as={NavLink} to="/favourites">My Favourites</Nav.Link>
                <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
              </>
            )}
          </Nav>

          {/* RIGHT */}
          <Nav className="ms-auto align-items-center gap-2">
            <button className="theme-btn" onClick={toggleTheme}>
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>

            {user ? (
              <>
                <Nav.Link as={NavLink} to="/favourites" className="position-relative">
                  <FaHeart />
                  {favourites.length > 0 && (
                    <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                      {favourites.length}
                    </Badge>
                  )}
                </Nav.Link>

                <Nav.Link as={NavLink} to="/cart" className="position-relative">
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
                    <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
                      {cartItems.length}
                    </Badge>
                  )}
                </Nav.Link>

                <NavDropdown align="end" title={<span><FaUser /> {user.email}</span>}>
                  <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={doLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              // ❗ Chưa login: hiện Register & Login
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
