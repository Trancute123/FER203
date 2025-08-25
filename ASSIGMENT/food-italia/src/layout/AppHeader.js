// src/layout/AppHeader.jsx
import { useMemo } from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Dropdown,
  Offcanvas,
  Button,
} from "react-bootstrap";
import {
  FaPizzaSlice,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaUser,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/header.css";

export default function AppHeader({
  brand = "FoodStore",
  user = null,
  cartCount = 0,
  wishlistCount = 0,
  onSignIn,
  onSignOut,
  onGoAccount,
  onGoWishlist,
  onGoCheckout,
  onGoCart,
}) {
  const avatarSrc = user?.avatar;
  const displayName = user?.name || user?.email || "Account";

  const CartBadge = useMemo(
    () =>
      cartCount > 0 ? (
        <Badge bg="light" text="dark" pill className="ms-1 fw-semibold">
          {cartCount}
        </Badge>
      ) : null,
    [cartCount]
  );

  const WishBadge = useMemo(
    () =>
      wishlistCount > 0 ? (
        <Badge bg="danger" pill className="ms-1">
          {wishlistCount}
        </Badge>
      ) : null,
    [wishlistCount]
  );

  return (
    <>
      {/* Tricolore thin bar */}
      

      <Navbar
        expand="lg"
        sticky="top"
        className="it-navbar shadow-sm"
        variant="dark"
      >
        <Container>
          {/* Brand */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <FaPizzaSlice className="me-2 fs-4" />
            <span className="fw-semibold">{brand}</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Offcanvas
            id="main-nav"
            placement="end"
            className="it-offcanvas"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <FaPizzaSlice className="me-2" />
                {brand}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* Left nav */}
              <Nav className="me-auto it-navlinks">
                <Nav.Link as={Link} to="/checkout" onClick={onGoCheckout}>
                  <FaClipboardList className="me-1 mb-1" />
                  Checkout
                </Nav.Link>
                <Nav.Link onClick={onGoWishlist}>
                  <FaHeart className="me-1 mb-1" />
                  Wishlist
                  {WishBadge}
                </Nav.Link>
                <Nav.Link onClick={onGoCart}>
                  <FaShoppingCart className="me-1 mb-1" />
                  Cart
                  {CartBadge}
                </Nav.Link>
              </Nav>

              {/* Right: account */}
              <div className="d-flex align-items-center gap-2">
                {user ? (
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as={Button}
                      variant="outline-light"
                      className="it-account-btn"
                    >
                      {avatarSrc ? (
                        <img
                          src={avatarSrc}
                          alt="avatar"
                          className="it-avatar me-2"
                        />
                      ) : (
                        <FaUserCircle className="me-2 fs-5" />
                      )}
                      <span className="d-none d-sm-inline">{displayName}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="it-menu">
                      <Dropdown.Item as={Link} to="/profile" onClick={onGoAccount}>
                        <FaUser className="me-2" />
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={onGoWishlist}>
                        <FaHeart className="me-2" />
                        Wishlist
                        {WishBadge}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item className="text-danger" onClick={onSignOut}>
                        <FaSignOutAlt className="me-2" />
                        Sign out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Button
                    variant="light"
                    className="it-signin-btn"
                    onClick={onSignIn}
                  >
                    <FaUserCircle className="me-2" />
                    Sign in
                  </Button>
                )}
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
