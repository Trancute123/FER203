import React, { useMemo, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Badge,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const nav = useNavigate();

  // Tổng tiền
  const total = useMemo(
    () => cartItems.reduce((a, i) => a + parseFloat(i.price || 0), 0),
    [cartItems]
  );

  const pay = () => {
    if (cartItems.length === 0) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
      clearCart();
      setTimeout(() => nav("/products", { replace: true }), 1200);
    }, 1000);
  };

  return (
    <div className="container checkout-wrap">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <Card className="checkout-card border-0 rounded-4 shadow-lg">
            <Card.Body className="p-4 p-md-5">
              <h2 className="fw-bold mb-2">Checkout</h2>
              <p className="text-muted mb-4">
                Review your order before confirming the payment.
              </p>

              {/* EMPTY STATE — thân thiện & có lời cảm ơn */}
              {cartItems.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-emoji">🧺</div>
                  <h4 className="empty-title">
                    Thanks for visiting FoodStore!
                  </h4>
                  <p className="empty-sub">
                    pick a few tasty items to enjoy.
                  </p>

                  {/* empty actions */}
                  <div className="empty-actions">
                    <Button as={Link} to="/products" className="btn btn-pay">
                      Explore products
                    </Button>
                    <Button
                      as={Link}
                      to="/favourites"
                      variant="outline-secondary"
                    >
                      View favourites
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Danh sách sản phẩm mua */}
                  <ListGroup variant="flush" className="mb-3">
                    {cartItems.map((it, idx) => (
                      <ListGroup.Item
                        key={`${it.id}-${idx}`}
                        className="co-item"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <Image
                            src={it.image}
                            alt={it.name}
                            rounded
                            className="co-thumb"
                          />
                          <div className="flex-grow-1">
                            <div className="fw-semibold">{it.name}</div>
                            <div className="text-muted small">
                              ${parseFloat(it.price).toFixed(2)}
                            </div>
                          </div>
                          <Badge bg="success" pill className="badge-soft">
                            1
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  {/* Tổng tiền */}
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-muted">Items</span>
                    <b>{cartItems.length}</b>
                  </div>
                  <hr className="my-2" />
                  <div className="d-flex justify-content-between align-items-center fs-4">
                    <span>Total</span>
                    <b>${total.toFixed(2)}</b>
                  </div>

                  {/* Actions */}
                  <div className="d-flex justify-content-between mt-4">
                    <Button
                      as={Link}
                      to="/products"
                      variant="outline-secondary"
                    >
                      Continue shopping
                    </Button>
                    <Button
                      className="btn-pay"
                      onClick={pay}
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Processing...
                        </>
                      ) : (
                        "Pay now"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast thành công */}
      <ToastContainer position="bottom-center" className="p-3">
        <Toast
          bg="success"
          onClose={() => setDone(false)}
          show={done}
          delay={1200}
          autohide
        >
          <Toast.Body className="text-white text-center fw-semibold">
            Payment successful!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
