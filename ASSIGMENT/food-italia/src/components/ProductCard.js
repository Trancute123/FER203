import { useState, useMemo } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useToast } from "../contexts/ToastContext";
import { FaHeart, FaRegHeart, FaCartPlus, FaEye } from "react-icons/fa";

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const nav = useNavigate();
  const { addToCart } = useCart();
  const { ids, toggle } = useWishlist();
  const { show } = useToast();

  const [hover, setHover] = useState(false);
  const wished = ids.has(product.id);
  const price = product.salePrice ?? product.price;

  const sx = useMemo(
    () => ({
      card: {
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: hover
          ? "0 14px 34px rgba(0,0,0,.12)"
          : "0 6px 22px rgba(0,0,0,.06)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "transform .22s ease, box-shadow .22s ease",
        background: "#fff",
        border: 0,
      },
      ribbon: {
        position: "absolute",
        top: 10,
        left: -6,
        background: "linear-gradient(90deg, #c62828, #e53935)",
        color: "#fff",
        fontSize: ".75rem",
        padding: "6px 12px 6px 18px",
        borderTopRightRadius: 999,
        borderBottomRightRadius: 999,
        boxShadow: "0 4px 12px rgba(230,57,53,.35)",
        textTransform: "uppercase",
        letterSpacing: ".5px",
        display: "inline-flex",
        alignItems: "center",
        zIndex: 2,
      },
      thumbWrap: {
        position: "relative",
        height: 220,
        overflow: "hidden",
        background: "#f6faf7",
      },
      img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition: "transform .35s ease",
      },
      priceOld: { color: "#9aa7a1", textDecoration: "line-through", fontWeight: 500 },
      priceNow: { color: "#2e7d32", fontWeight: 700 },
    }),
    [hover]
  );

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
    <Card
      className="h-100"
      style={sx.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {(product.tags || []).includes("hot") && <span style={sx.ribbon}>HOT</span>}

      <div style={sx.thumbWrap}>
        <Card.Img src={product.image} alt={product.title} style={sx.img} />
      </div>

      <Card.Body className="d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <Card.Title className="fs-6 text-success mb-0">{product.title}</Card.Title>
          {product.tags?.includes("sale") && <Badge bg="danger">SALE</Badge>}
        </div>

        <Card.Text className="small text-muted flex-grow-1">{product.description}</Card.Text>

        <div className="mb-2">
          {product.salePrice ? (
            <>
              <span className="me-2" style={sx.priceOld}>
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-danger fw-bold">${Number(product.salePrice).toFixed(2)}</span>
            </>
          ) : (
            <span style={sx.priceNow}>${Number(price).toFixed(2)}</span>
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
            onClick={() => (wished ? nav("/wishlist") : addWish())}
          >
            {wished ? <FaHeart className="me-1" /> : <FaRegHeart className="me-1" />}
            {wished ? "View Wishlist" : "Wish"}
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
