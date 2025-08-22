import React, { useState } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap"; // ❌ bỏ Badge
import { FaCartPlus, FaDollarSign, FaHeart, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFav } from "../context/FavouritesContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();
  const { favourites, toggleFav } = useFav();
  const [showToast, setShowToast] = useState(false);
  const inFav = favourites.some((f) => f.id === p.id);

  const handleAdd = () => {
    addToCart({ id: p.id, name: p.title, image: p.image, price: p.price });
    setShowToast(true);
  };

  return (
    <>
      <Card className="h-100 border-0 rounded-4 dish-card">
        <div className="dish-card__img-wrap">
          <Card.Img variant="top" src={p.image} alt={p.title} className="dish-card__img" />
          <div className="dish-card__price-chip">
            <FaDollarSign className="me-1" /> {Number(p.price).toFixed(2)}
          </div>
        </div>

        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-bold dish-card__title mb-1">{p.title}</Card.Title>
          <Card.Text className="text-muted small flex-grow-1">{p.description}</Card.Text>

          <div className="dish-card__actions mt-2">
            <div className="dish-card__btns">
              <Button as={Link} to={`/products/${p.id}`} className="btn-details">
                <FaInfoCircle className="me-1" /> Details
              </Button>

              <Button className="btn-add" onClick={handleAdd}>
                <FaCartPlus className="me-1" /> Add
              </Button>

              <Button
                className={`btn-fav ${inFav ? "active" : ""}`}
                onClick={() => toggleFav(p)}
              >
                <FaHeart className="me-1" />
                {inFav ? "Unilike" : "Like"}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body className="text-white">Added to cart</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
