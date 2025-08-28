import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { assetUrl } from "../utils/format";

// các context sẵn có của bạn
import { useFavourites } from "../context/FavouritesContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function FavouritesPage() {  
  const nav = useNavigate();
  const { ids, toggle, count } = useFavourites();
  const { addToCart } = useCart();
  const { show } = useToast();

  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tải toàn bộ products một lần (đơn giản, nhanh)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/products");
        const normalized = (data || []).map((p) => ({
          id: p.id,
          name: p.title || p.name,
          image: assetUrl(p.image),
          price: Number(p.price ?? 0),
          description: p.description,
          category: p.category,
        }));
        setAll(normalized);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Chỉ giữ sản phẩm nằm trong danh sách favourites
  const favProducts = useMemo(
    () => all.filter((p) => ids.has(p.id)),
    [all, ids]
  );

  const handleAddToCart = (p) => {
    addToCart(p);
    show("Added to cart!", "success", 2200); // toast
  };

  if (loading) {
    return (
      <Container className="py-4">
        <Card className="p-4 text-center">Loading favourites…</Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="mb-0">
          Favourites <Badge bg="danger">{count}</Badge>
        </h1>
        <Button variant="outline-secondary" onClick={() => nav("/")}>
          ← Back to Products
        </Button>
      </div>

      {favProducts.length === 0 ? (
        <Card className="p-4 text-center">
          You have no favourites yet.
          <div className="mt-3">
            <Button onClick={() => nav("/")}>Browse products</Button>
          </div>
        </Card>
      ) : (
        <Row className="g-4">
          {favProducts.map((p) => (
            <Col key={p.id} xs={12} sm={6} md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={p.image}
                  alt={p.name}
                  style={{ height: 200, objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h6">{p.name}</Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    {p.description}
                  </Card.Text>
                  <div className="fw-bold mb-2">${p.price.toFixed(2)}</div>

                  <div className="d-grid gap-2">
                    <Button
                      variant="success"
                      onClick={() => handleAddToCart(p)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => nav(`/products/${p.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        toggle(p.id);
                        show("Removed from favourites", "info", 1800);
                      }}
                    >
                      Remove from Favourites
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
