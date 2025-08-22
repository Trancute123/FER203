import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useFav } from "../context/FavouritesContext";

export default function ProductDetails() {
  const { id } = useParams();
  const p = products.find(x => String(x.id) === id);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favourites, toggleFav } = useFav();
  if (!p) return <div className="container py-4">Not found</div>;
  const inFav = favourites.some(f => f.id === p.id);

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={p.image} alt={p.title} className="img-fluid rounded-4" />
        </div>
        <div className="col-md-6">
          <h3 className="mb-2">{p.title}</h3>
          <Badge bg="success" className="mb-3">${Number(p.price).toFixed(2)}</Badge>
          <p className="text-muted">{p.description}</p>

          <div className="d-flex gap-2 mt-3">
            <Button variant="success" onClick={() => addToCart({ id: p.id, name: p.title, image: p.image, price: p.price })}>Add to Cart</Button>
            <Button variant={inFav ? "outline-danger" : "outline-secondary"} onClick={() => toggleFav(p)}>
              {inFav ? "Browse to My favourites" : "Add to Favourite"}
            </Button>
            <Button variant="outline-primary" onClick={() => navigate("/products")}>Back to List</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
