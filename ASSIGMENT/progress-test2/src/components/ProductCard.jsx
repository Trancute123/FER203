import { useNavigate } from "react-router-dom";
import { Button, Card, ButtonGroup, Badge } from "react-bootstrap";
import { FaEye, FaCartPlus, FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import { useToast } from "../context/ToastContext";
import { formatPrice } from "../utils/format";

export default function ProductCard({ product }) {
  const nav = useNavigate();
  const { addToCart } = useCart();
  const { ids, toggle } = useFavourites();
  const { show } = useToast();

  const wished = ids.has(product.id);

  return (
    <Card className="h-100 shadow-sm product-card">
      <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: 200, objectFit: "cover" }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">{product.name}</Card.Title>
        <Card.Text className="flex-grow-1 small text-muted mb-2">{product.description}</Card.Text>
        <div className="mb-3"><Badge bg="primary" className="fs-6">{formatPrice(product.price)}</Badge></div>

        <ButtonGroup className="w-100">
          <Button variant="outline-primary" size="sm" className="flex-fill" onClick={() => nav(`/products/${product.id}`)}>
            <FaEye className="me-1" /> View Details
          </Button>
          <Button variant="success" size="sm" className="flex-fill"
            onClick={() => { addToCart(product); show("Added to cart!", "success", 2000); }}>
            <FaCartPlus className="me-1" /> Add to Cart
          </Button>
          <Button variant={wished ? "danger" : "outline-danger"} size="sm" className="flex-fill"
            onClick={() => { toggle(product.id); show(wished ? "Removed from favourites" : "Added to favourites", "info", 1800); }}>
            <FaHeart className="me-1" /> Favourite
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
