// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { Container, Card, Table, Button, Badge, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaShoppingCart,
  FaDollarSign,
  FaArrowLeft,
  FaTrash,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { createOrder } from "../api";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, subtotal, incQty, decQty, removeFromCart, clearCart } =
    useCart();
  const { show } = useToast();
  const nav = useNavigate();
  const [err, setErr] = useState("");

  const placeOrder = async () => {
    setErr("");
    try {
      if (!user) throw new Error("Please sign in to checkout.");
      if (!items.length) throw new Error("Cart is empty.");

      // Lưu order về db.json với field `userid`
      await createOrder({
        userid: user.id,
        items: items.map((it) => it.id), // 👈 chỉ gửi id
        total: subtotal,
      });
      clearCart();
      show("Order placed!", "success");
      // Chuyển thẳng qua trang Profile (tab lịch sử)
      nav("/profile?show=orders");
    } catch (e) {
      setErr(e?.message || "Checkout failed");
    }
  };

  const Panel = ({ children }) => (
    <Card
      className="border-0"
      style={{
        borderRadius: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e9efe9",
          background:
            "linear-gradient(0deg, rgba(27,94,32,.08), rgba(193,18,31,.06))",
          fontWeight: 600,
          color: "#143a1f",
        }}
      >
        Order summary
      </div>
      <Card.Body style={{ background: "#fff" }}>{children}</Card.Body>
    </Card>
  );

  return (
    <div
      style={{
        minHeight: "calc(100vh - 140px)",
        background: "linear-gradient(180deg,#eef7f0,#e9f4ec)",
        padding: "28px 0 48px",
      }}
    >
      <Container style={{ maxWidth: 880 }}>
        {/* Title */}
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".75rem",
            color: "#17391f",
            marginBottom: 16,
          }}
        >
          <FaClipboardList />
          Checkout
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".4rem",
              padding: ".25rem .6rem",
              borderRadius: 999,
              background: "#f3faf5",
              color: "#16361d",
              border: "1px solid #e3eee6",
              fontSize: ".95rem",
            }}
          >
            <FaShoppingCart />
            Items: {items.length}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".4rem",
              padding: ".25rem .6rem",
              borderRadius: 999,
              background: "#f3faf5",
              color: "#16361d",
              border: "1px solid #e3eee6",
              fontSize: ".95rem",
            }}
          >
            <FaDollarSign /> ${subtotal.toFixed(2)}
          </span>
        </h3>

        <Panel>
          {err && (
            <Alert variant="danger" className="mb-3">
              {err}
            </Alert>
          )}

          {/* Empty state */}
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                border: "1px dashed #d7e5da",
                borderRadius: 12,
                background: "linear-gradient(180deg,#ffffff,#f8fbf9)",
              }}
            >
              <div style={{ fontSize: 48, opacity: 0.25, marginBottom: 14 }}>
                🛒
              </div>
              <div className="lead mb-2" style={{ fontWeight: 600 }}>
                Your cart is empty
              </div>
              <div className="text-muted mb-4">
                Add some pasta, pizza or tiramisù to checkout.
              </div>
              <Button
                onClick={() => nav("/")}
                style={{
                  backgroundColor: "#2e7d32",
                  border: "none",
                  borderRadius: 30,
                  padding: "10px 22px",
                  fontWeight: 600,
                }}
              >
                <FaArrowLeft className="me-2" />
                Back to Home
              </Button>
            </div>
          ) : (
            <>
              {/* Items table */}
              <Table
                hover
                responsive
                className="align-middle mb-3"
                style={{
                  border: "1px solid #e6efe8",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#f8fbf9",
                      borderBottom: "1px solid #e6efe8",
                    }}
                  >
                    <th>Item</th>
                    <th>Price</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td className="d-flex align-items-center gap-2">
                        <img
                          src={it.image}
                          alt=""
                          style={{
                            height: 48,
                            width: 48,
                            objectFit: "cover",
                            borderRadius: 10,
                            border: "1px solid #ecf2ee",
                          }}
                        />
                        <span className="fw-semibold">{it.title}</span>
                      </td>
                      <td>${Number(it.price).toFixed(2)}</td>
                      <td className="text-center">
                        <div className="d-inline-flex align-items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 10,
                              padding: 0,
                            }}
                            onClick={() => decQty(it.id)}
                          >
                            <FaMinus />
                          </Button>
                          <span
                            className="fw-semibold"
                            style={{ minWidth: 24, display: "inline-block" }}
                          >
                            {it.qty}
                          </span>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 10,
                              padding: 0,
                            }}
                            onClick={() => incQty(it.id)}
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </td>
                      <td className="text-end">
                        ${(it.qty * it.price).toFixed(2)}
                      </td>
                      <td className="text-end">
                        <Button
                          size="sm"
                          variant="outline-danger"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 10,
                            padding: 0,
                          }}
                          onClick={() => removeFromCart(it.id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Footer actions */}
              <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
                <Button
                  variant="outline-secondary"
                  onClick={clearCart}
                  style={{
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,.08)",
                    fontWeight: 600,
                  }}
                >
                  <FaTrash className="me-2" />
                  Clear Cart
                </Button>

                <div className="ms-auto d-flex align-items-center gap-3">
                  <div className="fs-5">
                    Subtotal: <Badge bg="success">${subtotal.toFixed(2)}</Badge>
                  </div>
                  <Button
                    onClick={placeOrder}
                    style={{
                      background: "linear-gradient(180deg,#2d7b35,#256a2d)",
                      border: "none",
                      borderRadius: 12,
                      padding: ".55rem .9rem",
                      fontWeight: 700,
                      boxShadow: "0 8px 24px rgba(37,106,45,.25)",
                    }}
                  >
                    Confirm &amp; Place Order
                  </Button>
                  <Button
                    variant="outline-secondary"
                    style={{
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,.08)",
                      fontWeight: 600,
                    }}
                    onClick={() => nav("/cart")}
                  >
                    Edit Cart
                  </Button>
                  <Button
                    variant="outline-secondary"
                    style={{
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,.08)",
                      fontWeight: 600,
                    }}
                    onClick={() => nav("/")}
                  >
                    <FaArrowLeft className="me-2" />
                    Continue shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </Panel>
      </Container>
    </div>
  );
}
