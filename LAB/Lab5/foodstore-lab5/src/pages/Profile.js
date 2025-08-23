import React from "react";
import { Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import { FaUser, FaHeart, FaShoppingCart, FaSignOutAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useFav } from "../context/FavouritesContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { cartItems } = useCart();  
  const { favourites } = useFav();
  const navigate = useNavigate();

  const displayName = user?.email || user?.username || "User";
  const initials = (displayName || "U").slice(0, 2).toUpperCase();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="container profile-wrap">
      <Card className="profile-card shadow-lg border-0 rounded-4">
        <Card.Body className="p-4 p-md-5">
          {/* header */}
          <div className="profile-header">
            <div className="profile-avatar">{initials}</div>

            <div className="profile-meta">
              <h3 className="mb-1">{displayName}</h3>
              <p className="text-muted mb-2">@{displayName.replace(/\s+/g, "").toLowerCase()}</p>

              <div className="profile-stats">
                <span className="stat-chip">
                  <FaShoppingCart /> {cartItems.length} in cart
                </span>
                <span className="stat-chip">
                  <FaHeart /> {favourites.length} favourites
                </span>
              </div>
            </div>

            <div className="profile-actions">
              <Button variant="outline-secondary" className="btn-theme" onClick={toggleTheme}>
                {isDark ? "☀️ Light" : "🌙 Dark"}
              </Button>
              <Button className="btn-logout" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" /> Logout
              </Button>
            </div>
          </div>

          {/* body */}
          <Row className="mt-4 g-4">
            <Col md={6}>
              <Card className="profile-subcard border-0">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Account</h5>
                  <ListGroup variant="flush" className="profile-info">
                    <ListGroup.Item>
                      <strong className="me-2"><FaUser className="me-1" /> Username:</strong>
                      {displayName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong className="me-2">Theme:</strong> {isDark ? "Dark" : "Light"}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
