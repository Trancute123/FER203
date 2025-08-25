import { useMemo } from "react";
import {
  Navbar, Nav, Container, Badge, Dropdown, Offcanvas, Button,
} from "react-bootstrap";
import {
  FaPizzaSlice, FaHeart, FaShoppingCart, FaUserCircle, FaUser,
  FaSignOutAlt, FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";

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
    () => (cartCount > 0 ? <Badge bg="light" text="dark" pill className="ms-1 fw-semibold">{cartCount}</Badge> : null),
    [cartCount]
  );
  const WishBadge = useMemo(
    () => (wishlistCount > 0 ? <Badge bg="danger" pill className="ms-1">{wishlistCount}</Badge> : null),
    [wishlistCount]
  );

  const bar = {
    height: 4,
    background: "linear-gradient(90deg,#1b5e20 0 33.33%, #ffffff 33.33% 66.66%, #c1121f 66.66% 100%)",
  };
  const navStyle = {
    background: "linear-gradient(135deg,#1b5e20 0%, #236b28 55%, #205f27 100%)",
    borderBottom: "1px solid rgba(255,255,255,.15)",
    boxShadow: "0 6px 24px rgba(10,36,16,.25)",
  };
  const pillBtn = {
    borderRadius: 999,
    padding: ".38rem .75rem",
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,.6)",
    color: "#fff",
    background: "linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.04))",
    backdropFilter: "saturate(140%) blur(2px)",
    filter: "brightness(.92)",           // 👈 giảm sáng nhẹ theo yêu cầu
  };

  return (
    <>
      <div style={bar} />
      <Navbar expand="lg" sticky="top" variant="dark" style={navStyle}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center text-white">
            <FaPizzaSlice className="me-2 fs-4" />
            <span className="fw-semibold">{brand}</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Offcanvas id="main-nav" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <FaPizzaSlice className="me-2" />
                {brand}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/checkout" onClick={onGoCheckout} className="text-white-50">
                  <FaClipboardList className="me-1 mb-1" /> Checkout
                </Nav.Link>
                <Nav.Link onClick={onGoWishlist} className="text-white-50">
                  <FaHeart className="me-1 mb-1" /> Wishlist {WishBadge}
                </Nav.Link>
                <Nav.Link onClick={onGoCart} className="text-white-50">
                  <FaShoppingCart className="me-1 mb-1" /> Cart {CartBadge}
                </Nav.Link>
              </Nav>

              <div className="d-flex align-items-center gap-2">
                {user ? (
                  <Dropdown align="end">
                    <Dropdown.Toggle as={Button} variant="outline-light" style={pillBtn}>
                      {avatarSrc ? (
                        <img
                          src={avatarSrc}
                          alt="avatar"
                          style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", border: "1px solid #e9f2ec" }}
                          className="me-2"
                        />
                      ) : (
                        <FaUserCircle className="me-2 fs-5" />
                      )}
                      <span className="d-none d-sm-inline">{displayName}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ borderRadius: 12, boxShadow: "0 14px 40px rgba(0,0,0,.10)" }}>
                      <Dropdown.Item as={Link} to="/profile" onClick={onGoAccount}>
                        <FaUser className="me-2" /> My Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={onGoWishlist}>
                        <FaHeart className="me-2" /> Wishlist {WishBadge}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item className="text-danger" onClick={onSignOut}>
                        <FaSignOutAlt className="me-2" /> Sign out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Button variant="outline-light" style={pillBtn} onClick={onSignIn}>
                    <FaUserCircle className="me-2" /> Sign in
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
