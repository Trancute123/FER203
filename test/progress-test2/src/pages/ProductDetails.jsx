// src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import api from "../services/api";
import { formatPrice } from "../utils/format";

export default function ProductDetails() {
  const { id } = useParams();
  const pid = String(id).match(/^\d+/)?.[0]; // lấy phần số: "1:1" -> "1"
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // DÙNG QUERY: /products?id=1  → trả về mảng
        const res = await api.get("/products", {
          params: { id: pid },
          validateStatus: () => true,
        });
        console.log("DETAIL", res.status, res.request?.responseURL, res.data);

        const item = Array.isArray(res.data) ? res.data[0] : null;
        if (res.status === 200 && item) {
          if (alive) setProduct(item);
        } else if (alive) {
          setErr(`Product not found (status ${res.status}).`);
        }
      } catch (e) {
        console.error(e);
        if (alive) setErr("Cannot reach API.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [pid]);

  if (loading)
    return (
      <div className="text-center p-5">
        <Spinner animation="border" />
      </div>
    );
  if (err)
    return (
      <Alert variant="danger" className="mt-3">
        {err}
      </Alert>
    );

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={5}>
          <Card>
            <Card.Img
              src={
                product.image?.startsWith("/")
                  ? product.image
                  : `/${product.image}`
              }
              alt={product.name}
            />
          </Card>
        </Col>
        <Col md={7}>
          <h3 className="mb-2">{product.name}</h3>
          <p className="text-muted">{product.description}</p>
          <Badge bg="primary" className="fs-6 mb-3">
            {formatPrice(product.price)}
          </Badge>
          <div className="d-flex gap-2">
            <Button as={Link} to="/" variant="outline-secondary">
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
