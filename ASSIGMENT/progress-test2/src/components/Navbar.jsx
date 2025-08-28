import { Link } from "react-router-dom";
import {
  Navbar as RBNavbar, Nav, Container, Badge, Dropdown, Offcanvas, Button,
} from "react-bootstrap";
import {
  FaHeart, FaShoppingCart, FaUserCircle, FaUser, FaSignOutAlt,
} from "react-icons/fa";

/**
 * NavBar – gọn cho mọi dự án
 * Props (đều optional):
 * - brand:      chuỗi
 * - user:       { name?, email?, avatar? } | null
 * - cartCount:  number
 * - wishCount:  number
 * - onSignIn/onSignOut:   function
 */
export default function NavBar({
  brand = "My Shop",
  user = null,
  cartCount = 0,
  wishCount = 0,
  onSignIn,
  onSignOut,
}) {
  const displayName = user?.name || user?.email || "Account";

  const pillBtn = {
    borderRadius: 999,
    padding: ".38rem .75rem",
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,.6)",
    color: "#fff",
    background: "linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.04))",
    backdropFilter: "saturate(140%) blur(2px)",
  };

  return (
    <RBNavbar expand="lg" sticky="top" variant="dark"
      style={{
        background: "linear-gradient(135deg,#1b5e20 0%, #236b28 55%, #205f27 100%)",
        borderBottom: "1px solid rgba(255,255,255,.15)",
        boxShadow: "0 6px 24px rgba(10,36,16,.25)",
      }}
    >
      <Container fluid>
        {/* Brand → về trang chủ */}
        <RBNavbar.Brand as={Link} to="/" className="text-white fw-semibold">
          {brand}
        </RBNavbar.Brand>

        <RBNavbar.Toggle aria-controls="main-nav" />
        <RBNavbar.Offcanvas id="main-nav" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{brand}</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            {/* Trái: 3 icon chính (Favourites, Cart, Login/Account) */}
            <Nav className="ms-auto align-items-center gap-2">

              {/* FAVOURITES */}
              <Nav.Link as={Link} to="/favourites" className="text-white">
                <FaHeart className="me-1" />
                Favourites
                {wishCount > 0 && (
                  <Badge bg="danger" pill className="ms-1">{wishCount}</Badge>
                )}
              </Nav.Link>

              {/* CART */}
              <Nav.Link as={Link} to="/cart" className="text-white">
                <FaShoppingCart className="me-1" />
                Cart
                {cartCount > 0 && (
                  <Badge bg="light" text="dark" pill className="ms-1 fw-semibold">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>

              {/* LOGIN / ACCOUNT */}
              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle as={Button} variant="outline-light" style={pillBtn}>
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="me-2"
                        style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      <FaUserCircle className="me-2" />
                    )}
                    <span className="d-none d-sm-inline">{displayName}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ borderRadius: 12 }}>
                    <Dropdown.Item as={Link} to="/profile">
                      <FaUser className="me-2" /> My Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-danger" onClick={onSignOut}>
                      <FaSignOutAlt className="me-2" /> Sign out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button variant="outline-light" style={pillBtn} as={Link} to="/login" onClick={onSignIn}>
                  <FaUserCircle className="me-2" /> Login
                </Button>
              )}
            </Nav>
          </Offcanvas.Body>
        </RBNavbar.Offcanvas>
      </Container>
    </RBNavbar>
  );
}
