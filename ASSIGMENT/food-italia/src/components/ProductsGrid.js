import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ products = [] }) {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
      {products.map((p) => (
        <Col key={p.id}>
          <ProductCard product={p} />
        </Col>
      ))}
    </Row>
  );
}
