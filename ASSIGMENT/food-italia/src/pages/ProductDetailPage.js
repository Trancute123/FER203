import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useToast } from "../contexts/ToastContext";
import { getProduct } from "../api";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { ids, toggle } = useWishlist();
  const { show } = useToast();

  useEffect(() => {
    getProduct(id)
      .then((found) => setProduct(found))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Loading product...</p>
      </Container>
    );

  if (!product) return <Container className="py-5">Product not found.</Container>;

  const wished = ids.has(product.id);

  return (
    <Container className="py-4">
      <div className="detail-card d-flex flex-column flex-md-row gap-4 p-3 bg-white rounded-4 shadow-sm">
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", maxWidth: "420px", borderRadius: "12px", objectFit: "cover" }}
        />

        <div className="flex-grow-1">
          <h2 className="text-success">{product.title}</h2>
          <p className="text-muted">{product.description}</p>

          <div className="price my-3">
            {product.salePrice ? (
              <>
                <span className="text-muted text-decoration-line-through me-2">
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className="fw-bold text-danger">
                  ${Number(product.salePrice).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="fw-bold text-success">
                ${Number(product.price).toFixed(2)}
              </span>
            )}
          </div>

          <div className="d-flex gap-3">
            <Button
              variant="success"
              onClick={() => {
                addToCart(product);
                show("Added to cart!", "success", 2500);
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant={wished ? "outline-danger" : "danger"}
              onClick={() => {
                toggle(product);
                show(wished ? "Removed from wishlist" : "Added to wishlist!", "info", 2500);
              }}
            >
              {wished ? "In Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
