// src/pages/WishlistPage.jsx
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash, FaCartPlus, FaEye, FaFire } from "react-icons/fa";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const { addToCart } = useCart();
  const { show } = useToast();
  const nav = useNavigate();

  const hasSale = (p) => Array.isArray(p.tags) && p.tags.includes("sale");
  const isHot   = (p) => Array.isArray(p.tags) && p.tags.includes("hot");

  const sx = {
    page: { minHeight: "calc(100vh - 160px)", background: "linear-gradient(180deg,#eef7f0,#e9f4ec)", padding: "28px 0 48px" },
    titleWrap: { display: "flex", alignItems: "center", gap: 10, color: "#17391f", marginBottom: 16 },
    titleIcon: { fontSize: 28, filter: "drop-shadow(0 2px 4px rgba(0,0,0,.15))" },
    card: {
      border: "1px solid #e8eee9",
      borderRadius: 16,
      background: "#fff",
      boxShadow: "0 10px 32px rgba(16,48,24,.10)",
      overflow: "hidden",
      transition: "transform .18s ease, box-shadow .18s ease",
    },
    cardHover: { transform: "translateY(-3px)", boxShadow: "0 14px 38px rgba(16,48,24,.18)" },
    thumbWrap: { height: 220, overflow: "hidden", background: "#f6faf7" },
    thumbImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform .35s ease" },
    price: { fontWeight: 700, color: "#2e7d32" },
    old: { textDecoration: "line-through", color: "#9aa7a1", marginRight: 8, fontWeight: 500 },
    btn: { borderRadius: 12, fontWeight: 600 },
    pill: {
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "#f3faf5", color: "#16361d", border: "1px solid #e3eee6",
      padding: "4px 10px", borderRadius: 999, fontSize: ".9rem"
    },
    empty: {
      background: "#fff", border: "1px dashed #d7e5da", borderRadius: 16,
      padding: 26, textAlign: "left", maxWidth: 560,
      boxShadow: "0 8px 26px rgba(16,48,24,.06)"
    }
  };

  return (
    <div style={sx.page}>
      <Container>
        <h3 style={sx.titleWrap}>
          <FaHeart style={sx.titleIcon} /> Your Wishlist
        </h3>

        {/* EMPTY STATE */}
        {!items.length ? (
          <div style={sx.empty}>
            <div style={{ fontSize: 24, color: "#1b5e20", marginBottom: 6 }}>💚</div>
            <div className="lead mb-2">No items in wishlist</div>
            <div className="text-muted mb-3">Save your favourite Italian dishes to view later.</div>
            <Button
              style={{ ...sx.btn, background: "linear-gradient(180deg,#2d7b35,#256a2d)", border: "1px solid #2b6e32" }}
              onClick={() => nav("/")}
            >
              Explore dishes
            </Button>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-3">
            {items.map((p) => (
              <Col key={p.id}>
                <Card
                  className="h-100"
                  style={sx.card}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, sx.cardHover)}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = sx.card.boxShadow;
                  }}
                >
                  <div style={sx.thumbWrap}>
                    <img
                      src={p.image}
                      alt={p.title}
                      style={sx.thumbImg}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                    />
                  </div>

                  <Card.Body className="d-flex flex-column p-3">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <Card.Title className="fs-6 text-success mb-0">{p.title}</Card.Title>
                      <div className="d-flex align-items-center gap-1">
                        {isHot(p) && (
                          <span style={sx.pill}><FaFire /> HOT</span>
                        )}
                        {hasSale(p) && <Badge bg="danger">SALE</Badge>}
                      </div>
                    </div>

                    <Card.Text className="small text-muted flex-grow-1">{p.description}</Card.Text>

                    <div className="mb-2">
                      {p.salePrice ? (
                        <>
                          <span style={sx.old}>${Number(p.price).toFixed(2)}</span>
                          <span className="text-danger fw-bold">${Number(p.salePrice).toFixed(2)}</span>
                        </>
                      ) : (
                        <span style={sx.price}>${Number(p.price).toFixed(2)}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="success"
                        className="w-50"
                        style={sx.btn}
                        onClick={() => {
                          addToCart(p);
                          show("Added to cart!", "success", 2200);
                        }}
                      >
                        <FaCartPlus className="me-1" /> Add
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        className="w-50"
                        style={sx.btn}
                        onClick={() => {
                          toggle(p); // remove khỏi wishlist
                          show("Removed from wishlist", "info", 2000);
                        }}
                      >
                        <FaTrash className="me-1" /> Remove
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      variant="outline-secondary"
                      className="mt-2"
                      style={sx.btn}
                      onClick={() => nav(`/product/${p.id}`)}
                    >
                      <FaEye className="me-1" /> View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
