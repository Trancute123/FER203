import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useToast } from "../contexts/ToastContext";
import { FaHeart, FaRegHeart, FaCartPlus, FaEye } from "react-icons/fa";
import "./product-card.css";

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const nav = useNavigate();
  const { addToCart } = useCart();
  const { ids, toggle } = useWishlist();
  const { show } = useToast();

  const price = product.salePrice ?? product.price;
  const wished = ids.has(product.id);

  const addCart = () => {
    addToCart(product);
    show("Added to cart!", "success", 2500);
  };

  const addWish = () => {
    if (!user) {
      const uri = encodeURIComponent(window.location.pathname + window.location.search);
      show("Please sign in to save wishlist", "info", 2500);
      nav(`/login?redirect_uri=${uri}`);
      return;
    }
    toggle(product);
    show(wished ? "Removed from wishlist" : "Added to wishlist!", "success", 2500);
  };

  return (
    <Card className="product-card h-100 border-0 shadow-sm rounded-4">
      {(product.tags || []).includes("hot") && (
        <span className="pc-ribbon">HOT</span>
      )}

      <div className="pc-thumb">
        <Card.Img src={product.image} alt={product.title} />
      </div>

      <Card.Body className="d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <Card.Title className="fs-6 text-success mb-0">{product.title}</Card.Title>
          {product.tags?.includes("sale") && <Badge bg="danger">SALE</Badge>}
        </div>

        <Card.Text className="small text-muted flex-grow-1">
          {product.description}
        </Card.Text>

        <div className="pc-price mb-2">
          {product.salePrice ? (
            <>
              <span className="pc-old me-2">${Number(product.price).toFixed(2)}</span>
              <span className="pc-now text-danger">${Number(product.salePrice).toFixed(2)}</span>
            </>
          ) : (
            <span className="pc-now">${Number(price).toFixed(2)}</span>
          )}
        </div>

        <div className="d-flex gap-2">
          <Button variant="success" className="w-50 rounded-3" size="sm" onClick={addCart}>
            <FaCartPlus className="me-1" /> Add
          </Button>
          <Button
            variant={wished ? "outline-danger" : "danger"}
            className="w-50 rounded-3"
            size="sm"
            onClick={addWish}
          >
            {wished ? <FaHeart className="me-1" /> : <FaRegHeart className="me-1" />}
            {wished ? "Wishlist" : "Wish"}
          </Button>
        </div>

        <Button
          variant="outline-secondary"
          size="sm"
          className="mt-2 rounded-3"
          onClick={() => nav(`/product/${product.id}`)}
        >
          <FaEye className="me-1" /> View Details
        </Button>
      </Card.Body>
    </Card>
  );
}
