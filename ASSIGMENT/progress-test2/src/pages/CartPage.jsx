import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { items, remove, clear, total } = useCart();
  const nav = useNavigate();

  if (items.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>Your cart is empty 🛒</h2>
        <Button className="mt-3" onClick={() => nav("/")}>
          ← Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="mb-4">Your Cart</h2>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={it.id}>
                  <td>{i + 1}</td>
                  <td>{it.name}</td>
                  <td>{it.qty}</td>
                  <td>${it.price.toFixed(2)}</td>
                  <td>${(it.price * it.qty).toFixed(2)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => remove(it.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between mt-3">
            <h4>Total: ${total.toFixed(2)}</h4>
            <div>
              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={() => clear()}
              >
                Clear Cart
              </Button>
              <Button variant="success">Checkout</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
