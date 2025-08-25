// src/pages/WishlistPage.jsx
import { useWishlist } from "../contexts/WishlistContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/page-italia.css";

export default function WishlistPage(){
  const { items } = useWishlist();
  const nav = useNavigate();

  return (
    <div className="it-page">
      <Container>
        <h3 className="it-page-title"><FaHeart className="it-title-icon" /> Your Wishlist</h3>

        {!items.length ? (
          <div className="it-empty">
            <div className="it-empty-icon">💚</div>
            <div className="lead mb-2">No items in wishlist</div>
            <div className="text-muted mb-3">Save your favourite Italian dishes to view later.</div>
            <Button className="it-btn it-btn-green" onClick={()=>nav("/")}>Explore dishes</Button>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-3">
            {items.map(p=>(
              <Col key={p.id}><ProductCard product={p} /></Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
