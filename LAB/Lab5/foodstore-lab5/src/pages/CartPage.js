import React, { useState } from "react";
import { Button, Card, ListGroup, Badge, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { FaDollarSign, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, totalValue } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const openConfirm = () => {
    if (cartItems.length === 0) return;
    if (!user) return navigate("/login", { state: { from: "/checkout" } }); // ép login trước khi checkout
    setShowConfirm(true);
  };

  const handleConfirmPay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowConfirm(false);
      setPaid(true);
      clearCart();
      setTimeout(() => setPaid(false), 4000);
      navigate("/checkout"); // đi tới trang Checkout đơn giản (đã làm)
    }, 1200);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Cart</h2>

      {cartItems.length === 0 ? (
        <Card className="border-0 rounded-4 shadow-sm">
          <Card.Body className="text-center text-muted py-5">Your cart is empty</Card.Body>
        </Card>
      ) : (
        <Card className="border-0 rounded-4 shadow-sm">
          <Card.Body>
            <ListGroup variant="flush" className="mb-3">
              {cartItems.map((item, idx) => (
                <ListGroup.Item key={`${item.id}-${idx}`} className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 12 }}
                    />
                    <div>
                      <div className="fw-semibold">{item.name}</div>
                      <div className="text-muted small">
                        <FaDollarSign className="me-1" />
                        {Number(item.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline-danger" onClick={() => removeFromCart(item.id)}>
                    <FaTrash className="me-1" />
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
              <div className="d-flex align-items-center gap-2">
                <Badge bg="success">Items: {cartItems.length}</Badge>
                <Badge bg="danger">Total: ${totalValue}</Badge>
              </div>
              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={() => navigate("/products")}>
                  Continue shopping
                </Button>
                <Button
                  variant="success"
                  onClick={openConfirm}
                  disabled={processing || cartItems.length === 0}
                >
                  {processing ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : (
                    "Checkout"
                  )}
                </Button>
                <Button variant="outline-secondary" onClick={clearCart}>
                  Clear cart
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Modal xác nhận thanh toán */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm your order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1">
            Items: <b>{cartItems.length}</b>
          </p>
          <p className="mb-0">
            Total: <b>${totalValue}</b>
          </p>
          <small className="text-muted">Please confirm to proceed with the payment.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)} disabled={processing}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmPay} disabled={processing}>
            {processing ? "Paying..." : "Pay now"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast thành công */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="success" onClose={() => setPaid(false)} show={paid} delay={4000} autohide>
          <Toast.Body className="text-white">Payment successful! Thank you.</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
