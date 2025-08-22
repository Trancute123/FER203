import React from "react";
import { useFav } from "../context/FavouritesContext";
import { Row, Col, Alert } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

export default function FavouritesPage() {
  const { favourites } = useFav();
  return (
    <div className="container py-4">
      <h2 className="mb-3">My Favourites</h2>
      {favourites.length === 0 ? <Alert variant="info">Chưa có sản phẩm yêu thích.</Alert> : (
        <Row className="g-4">
          {favourites.map(p => (
            <Col key={p.id} xs={12} sm={6} md={4} lg={3}><ProductCard p={p} /></Col>
          ))}
        </Row>
      )}
    </div>
  );
}
