import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import {
  Card,
  ListGroup,
  Button,
  Badge,
  Modal,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import {
  FaShoppingCart,
  FaTrash,
  FaDollarSign,
  FaCheckCircle,
} from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);

  // Xác nhận & thanh toán
  const [showConfirm, setShowConfirm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const openConfirm = () => {
    if (cartItems.length === 0) return;
    setShowConfirm(true);
  };

  const handleConfirmPay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowConfirm(false);
      setPaid(true);
      clearCart();
      setTimeout(() => setPaid(false), 5000);
    }, 1200);
  };

  return (
    <>
      <section className="cart-sec container py-4">
        <div className="d-flex align-items-center mb-3">
          <h2 className="cart-title d-flex align-items-center gap-2">
            <FaShoppingCart className="text-success" size={22} />
            <span className="vn-text">Giỏ hàng</span>
          </h2>
        </div>

        {cartItems.length === 0 ? (
          <Card className="cart-card empty border-0 rounded-4 shadow-sm">
            <Card.Body className="text-center text-muted py-5">
              Giỏ hàng của bạn đang trống.
            </Card.Body>
          </Card>
        ) : (
          <Card className="cart-card border-0 rounded-4 shadow-sm">
            <Card.Body>
              <ListGroup variant="flush" className="mb-3">
                {cartItems.map((item, idx) => (
                  <ListGroup.Item
                    key={`${item.id}-${idx}`} // ✅ key ổn định
                    className="d-flex align-items-center justify-content-between cart-row"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-thumb"
                      />
                      <div>
                        <div className="fw-semibold">{item.name}</div>
                        <div className="text-muted small">
                          <FaDollarSign className="me-1" />
                          {parseFloat(item.price).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline-danger"
                      className="btn-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash className="me-1" />
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                <div className="d-flex align-items-center gap-2">
                  <Badge bg="success" className="badge-soft">
                    {`Số món: ${cartItems.length}`}
                  </Badge>
                  <Badge bg="danger" className="badge-gradient">
                    {`Tổng: $${totalValue}`}
                  </Badge>
                </div>

                <div className="d-flex gap-2">
                  <Button
                    variant="secondary"
                    className="btn-clear"
                    onClick={clearCart}
                    disabled={processing}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    variant="success"
                    className="btn-checkout"
                    onClick={openConfirm}
                    disabled={processing || cartItems.length === 0} // ✅ disable khi trống
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
                      "Confirm Order"
                    )}
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
      </section>

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
          <small className="text-muted">
            Please confirm to proceed with the payment.
          </small>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirm(false)}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="btn-checkout"
            onClick={handleConfirmPay}
            disabled={processing}
          >
            {processing ? "Paying..." : "Pay now"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast thành công */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setPaid(false)}
          show={paid}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <FaCheckCircle className="me-2 text-success" />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Payment successful! Thank you for your purchase.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* ================== Styles ================== */}
      <style>{`
        :root{
          --green:#2e7d32;
          --green-600:#1b5e20;
          --red:#c62828;
          --shadow:0 10px 22px rgba(0,0,0,.12);
          --shadow-lg:0 16px 36px rgba(0,0,0,.18);
          /* fallback nếu app chưa inject theme vars */
          --card:#ffffff;
          --border:rgba(0,0,0,.08);
          --text:#111;
        }

        .cart-title{ font-weight:800; color:var(--green); }

        .cart-card{ box-shadow: var(--shadow); background: var(--card); }
        .cart-card.empty{ background: var(--card); }

        /* ✅ ép ListGroup.Item theo theme, không bị nền trắng */
        .cart-card .list-group-item{
          background: var(--card) !important;
          border-color: var(--border) !important;
          color: var(--text) !important;
          padding-left: 0;
          padding-right: 0;
        }

        .cart-row{
          padding: 12px 0;
          border-bottom: 1px dashed var(--border);
        }
        .cart-row:last-child{ border-bottom: none; }

        .cart-thumb{
          width:64px; height:64px; object-fit:cover;
          border-radius:12px; border:1px solid var(--border);
          background: var(--card);
        }

        .btn-remove{
          border-width: 2px;
          font-weight: 700;
        }
        .btn-clear{
          font-weight:700; border:none;
        }
        .btn-checkout{
          background: var(--green);
          border: none !important;
          font-weight: 800;
          letter-spacing: .2px;
        }
        .btn-checkout:hover{ background: var(--green-600); }

        .badge-soft{
          background: rgba(46,125,50,.12) !important;
          color: var(--green) !important;
          border: 1px solid rgba(46,125,50,.2);
          padding: 8px 12px;
          border-radius: 999px;
          font-weight: 800;
        }
        .badge-gradient{
          background: linear-gradient(135deg, var(--red), #ff5252) !important;
          color:#fff !important; padding: 8px 12px; border-radius: 999px;
          box-shadow: 0 6px 16px rgba(198,40,40,.35);
          font-weight: 800;
        }
      `}</style>
    </>
  );
};

export default Cart;
