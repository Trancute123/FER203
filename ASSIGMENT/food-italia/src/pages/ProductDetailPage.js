import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useToast } from "../contexts/ToastContext";
import { getProduct } from "../api";

export default function ProductDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const { addToCart } = useCart();
  const { ids, toggle } = useWishlist();
  const { show } = useToast();

  useEffect(() => {
    let stop = false;
    async function run() {
      setLoading(true); setErr("");
      try {
        const found = await getProduct(id);
        if (!stop) setProduct(found || null);
      } catch (e) {
        if (!stop) setErr("Product not found");
      } finally {
        if (!stop) setLoading(false);
      }
    }
    if (id) run();
    return () => { stop = true; };
  }, [id]);

  if (loading)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Loading product...</p>
      </Container>
    );

  if (err || !product)
    return (
      <Container className="py-5 text-center" style={{maxWidth:720}}>
        <h5 className="mb-3">{err || "Product not found"}</h5>
        <Button variant="success" onClick={() => nav("/")}>Back to Home</Button>
      </Container>
    );

  const wished = ids.has(product.id);
  const price = product.salePrice ?? product.price;

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
                ${Number(price).toFixed(2)}
              </span>
            )}
          </div>

          <div className="d-flex gap-3">
            <Button
              variant="success"
              onClick={() => { addToCart(product); show("Added to cart!", "success", 2500); }}
            >
              Add to Cart
            </Button>
            <Button
              variant={wished ? "outline-danger" : "danger"}
              onClick={() => { toggle(product); show(wished ? "Removed from wishlist" : "Added to wishlist!", "info", 2500); }}
            >
              {wished ? "In Wishlist" : "Add to Wishlist"}
            </Button>
           
          </div>
        </div>
      </div>
    </Container>
  );
}
