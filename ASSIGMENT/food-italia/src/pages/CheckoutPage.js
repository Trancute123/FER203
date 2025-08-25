// src/pages/CheckoutPage.jsx
import { useState, useMemo } from "react";
import { Container, Card, Button, Alert, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaShoppingCart, FaDollarSign, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { createOrder } from "../api";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const { show } = useToast();
  const [err, setErr] = useState("");
  const nav = useNavigate();

  // ====== local styles (no external CSS) ======
  const S = useMemo(
    () => ({
      page: {
        minHeight: "calc(100vh - 120px)",
        background:
          "linear-gradient(180deg, #eef7f0 0%, #e9f4ec 100%)",
        padding: "28px 0 48px",
      },
      titleWrap: { display: "flex", alignItems: "center", gap: 10, color: "#17391f", marginBottom: 14 },
      titleIcon: { fontSize: 24, filter: "drop-shadow(0 1px 2px rgba(0,0,0,.15))" },
      pill: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "#f3faf5",
        color: "#16361d",
        border: "1px solid #e3eee6",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: ".9rem",
      },
      card: {
        background: "#fff",
        border: "1px solid #e8eee9",
        borderRadius: 16,
        boxShadow: "0 12px 36px rgba(16,48,24,.12)",
        overflow: "hidden",
      },
      cardHead: {
        background: "linear-gradient(180deg, rgba(27,94,32,.10), rgba(27,94,32,.03))",
        borderBottom: "1px solid #e6efe8",
        padding: "12px 16px",
        fontWeight: 600,
      },
      cardBody: { padding: 18 },
      btnPrimary: {
        background: "linear-gradient(180deg,#2d7b35,#256a2d)",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        fontWeight: 600,
        padding: "8px 14px",
        boxShadow: "0 8px 22px rgba(37,106,45,.35)",
      },
      btnLight: {
        background: "#fff",
        color: "#2b2b2b",
        border: "1px solid #e5ece8",
        borderRadius: 10,
        fontWeight: 600,
        padding: "8px 14px",
      },
      btnGhost: {
        background: "#fff",
        color: "#2b2b2b",
        border: "1px solid #e5ece8",
        borderRadius: 10,
        fontWeight: 600,
        padding: "8px 14px",
      },
      emptyBox: {
        background: "#fff",
        border: "1px dashed #d7e5da",
        borderRadius: 16,
        padding: 26,
        textAlign: "center",
        boxShadow: "0 8px 26px rgba(16,48,24,.06)",
      },
      emptyIcon: {
        fontSize: 40,
        marginBottom: 10,
        color: "#1b5e20",
        filter: "drop-shadow(0 2px 6px rgba(27,94,32,.25))",
      },
    }),
    []
  );

  const placeOrder = async () => {
    setErr("");
    try {
      if (!user) throw new Error("Please sign in to checkout");
      if (!items.length) throw new Error("Cart is empty");

      await createOrder({ userId: user.id, items, total: subtotal });
      clearCart();
      show("Order placed!", "success");
      nav("/");
    } catch (e) {
      setErr(e.message || "Checkout failed");
    }
  };

  return (
    <div style={S.page}>
      <Container style={{ maxWidth: 780 }}>
        {/* Title */}
        <div style={S.titleWrap}>
          <FaClipboardList style={S.titleIcon} />
          <h3 style={{ margin: 0 }}>Checkout</h3>
          <span style={S.pill}>
            <FaShoppingCart /> Items: {items.length}
          </span>
          <span style={{ ...S.pill, marginLeft: 8 }}>
            <FaDollarSign /> ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Card */}
        <Card style={S.card}>
          <div style={S.cardHead}>Order summary</div>
          <Card.Body style={S.cardBody}>
            {err && <Alert variant="danger" className="mb-3">{err}</Alert>}

            {items.length === 0 ? (
              <div style={S.emptyBox}>
                <div style={S.emptyIcon}>🧾</div>
                <div className="lead mb-2">Your cart is empty</div>
                <div className="text-muted mb-3">
                  Add some pasta, pizza or tiramisù to checkout.
                </div>
                <Button onClick={() => nav("/")} style={S.btnPrimary}>
                  <FaArrowLeft className="me-2" />
                  Back to Home
                </Button>
              </div>
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>
                    Items{" "}
                    <Badge bg="light" text="dark">
                      {items.length}
                    </Badge>
                  </div>
                  <div className="fs-5">
                    Total: <strong>${subtotal.toFixed(2)}</strong>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <Button style={S.btnPrimary} onClick={placeOrder}>
                    Confirm &amp; Place Order
                  </Button>
                  <Button style={S.btnLight} onClick={() => nav("/cart")}>
                    Edit Cart
                  </Button>
                  <Button style={{ ...S.btnGhost, marginLeft: "auto" }} onClick={() => nav("/")}>
                    <FaArrowLeft className="me-2" />
                    Continue Shopping
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
