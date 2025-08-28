import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import api from "../services/api";
import { assetUrl } from "../utils/format";

export default function ProductDetails() {
  const { id } = useParams();             // "/products/:id"
  const navigate = useNavigate();

  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const normalize = (x) => ({
    id: x?.id,
    name: x?.name || x?.title || "",
    description: x?.description || "",
    image: assetUrl(x?.image),
    price: Number(x?.price ?? 0),
    category: x?.category || "",
  });

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setErr("");
      try {
        // 1) thử /products/:id
        const res = await api.get(`/products/${id}`);
        if (!alive) return;
        setP(normalize(res.data));
      } catch (e) {
        // 2) nếu 404 thì fallback /products?id=:id
        const status = e?.response?.status;
        console.warn("GET /products/:id failed", { id, status, err: e?.message });
        if (status === 404) {
          try {
            const res2 = await api.get("/products", { params: { id } });
            if (!alive) return;
            const first = Array.isArray(res2.data) ? res2.data[0] : null;
            if (first) setP(normalize(first));
            else setErr("Product not found");
          } catch {
            if (alive) setErr("Product not found");
          }
        } else {
          if (alive) setErr("Failed to load product");
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner />
        <div className="mt-2">Loading product…</div>
      </Container>
    );
  }

  if (err || !p) {
    return (
      <Container className="py-5 text-center" style={{ maxWidth: 720 }}>
        <Alert variant="danger" className="mb-3">{err || "Product not found"}</Alert>
        <Button onClick={() => navigate("/")}>← Back to Products</Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Img src={p.image} alt={p.name} />
          </Card>
        </Col>
        <Col md={7}>
          <h3 className="mb-2">{p.name}</h3>
          <p className="text-muted">{p.description}</p>
          <div className="mb-3"><span className="fs-4 fw-bold">${p.price.toFixed(2)}</span></div>
          <Button variant="primary" onClick={() => navigate("/")}>← Back to Products</Button>
        </Col>
      </Row>
    </Container>
  );
}
