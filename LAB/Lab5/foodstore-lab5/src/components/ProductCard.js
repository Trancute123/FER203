import React, { useState } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { FaCartPlus, FaDollarSign, FaHeart, FaInfoCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFav } from "../context/FavouritesContext";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();
  const { favourites, toggleFav } = useFav();
  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [showToast, setShowToast] = useState(false);
  const inFav = favourites.some((f) => f.id === p.id);

  const handleAdd = () => {
    addToCart({ id: p.id, name: p.title, image: p.image, price: p.price });
    setShowToast(true);
  };

  const handleFav = () => {
    if (!user) {
      // Chưa login → tới /login, giữ from để quay lại đúng trang
      navigate("/login", {
        state: { from: location.pathname, intent: { type: "fav", productId: p.id } },
      });
      return;
    }
    toggleFav(p);
  };

  return (
    <>
      <Card className="h-100 border-0 rounded-4 dish-card">
        <div className="dish-card__img-wrap">
          <Card.Img
            variant="top"
            src={p.image}
            alt={p.title}
            className="dish-card__img"
          />
          <div
            className="dish-card__price-chip"
            aria-label={`Price $${Number(p.price).toFixed(2)}`}
          >
            <FaDollarSign className="me-1" />
            {Number(p.price).toFixed(2)}
          </div>
        </div>

        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-bold dish-card__title mb-1">{p.title}</Card.Title>
          <Card.Text className="text-muted small flex-grow-1">{p.description}</Card.Text>

          <div className="dish-card__actions mt-2">
            <div className="dish-card__btns">
              <Button as={Link} to={`/products/${p.id}`} className="btn-details" aria-label="View details">
                <FaInfoCircle className="me-1" /> Details
              </Button>

              <Button className="btn-add" onClick={handleAdd} aria-label="Add to cart">
                <FaCartPlus className="me-1" /> Add
              </Button>

              {inFav ? (
                <Button
                  className="btn-fav active"
                  as={Link}
                  to="/favourites"
                  aria-pressed="true"
                  aria-label="Browse favourites"
                >
                  <FaHeart className="me-1" />
                  Unlike
                </Button>
              ) : (
                <Button
                  className="btn-fav"
                  onClick={handleFav}
                  aria-pressed="false"
                  aria-label="Like"
                >
                  <FaHeart className="me-1" />
                  Like
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Toast Added to cart */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">Added to cart</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
