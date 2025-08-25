// src/pages/CartPage.jsx
import { useMemo } from "react";
import { useCart } from "../contexts/CartContext";
import { Container, Table, Button, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaCartArrowDown,
  FaArrowLeft,
} from "react-icons/fa";

export default function CartPage() {
  const { items, subtotal, incQty, decQty, removeFromCart, clearCart } =
    useCart();
  const nav = useNavigate();

  // ---- inline styles (chỉ trong file này) ----
  const S = useMemo(
    () => ({
      page: {
        minHeight: "calc(100vh - 120px)",
        background:
          "radial-gradient(1200px 400px at 50% -10%, #eaf6ee 0%, #e3f1ea 40%, #e1efe7 60%, #def0e7 100%)",
        padding: "18px 0 48px",
      },
      titleRow: { display: "flex", alignItems: "center", gap: 8, color: "#17391f" },
      titleIcon: {
        fontSize: 20,
        filter: "drop-shadow(0 1px 3px rgba(0,0,0,.18))",
        transform: "translateY(-1px)",
      },
      card: {
        border: "1px solid #e6efe8",
        borderRadius: 14,
        boxShadow: "0 10px 26px rgba(16,48,24,.10)",
        overflow: "hidden",
      },
      cardHead: {
        padding: "10px 14px",
        background:
          "linear-gradient(180deg, rgba(27,94,32,.08), rgba(27,94,32,.03))",
        borderBottom: "1px solid #e6efe8",
      },
      thumb: {
        height: 36,
        width: 36,
        objectFit: "cover",
        borderRadius: 8,
        border: "1px solid #ecf2ee",
      },
      qtyBtn: {
        width: 30,
        height: 30,
        padding: 0,
        borderRadius: 10,
      },
      subtle: { color: "#5f6f65" },
      pill: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: ".25rem .55rem",
        borderRadius: 999,
        background: "#f3faf5",
        border: "1px solid #e3eee6",
        color: "#16361d",
      },
      emptyBox: {
        background: "#fff",
        border: "1px dashed #d7e5da",
        borderRadius: 16,
        padding: 26,
        textAlign: "center",
        boxShadow: "0 8px 26px rgba(16,48,24,.06)",
      },
      greenBtn: {
        background:
          "linear-gradient(180deg, #2d7b35 0%, #256a2d 100%)",
        border: "1px solid rgba(0,0,0,.05)",
        borderRadius: 12,
        fontWeight: 600,
      },
      outlineBtn: {
        borderRadius: 12,
        fontWeight: 600,
      },
    }),
    []
  );

  return (
    <div style={S.page}>
      <Container>
        <h4 style={S.titleRow}>
          <FaCartArrowDown style={S.titleIcon} /> Your Cart
        </h4>

        {!items.length ? (
          <div style={S.emptyBox}>
            <div style={{ fontSize: 34, color: "#1b5e20", marginBottom: 8 }}>
              🛒
            </div>
            <div className="lead mb-2">Cart is empty</div>
            <div style={S.subtle} className="mb-3">
              Hungry? Add fresh pasta, pizza, tiramisù…
            </div>
            <Button style={S.greenBtn} onClick={() => nav("/")}>
              Start shopping
            </Button>
          </div>
        ) : (
          <Card style={S.card}>
            <div style={S.cardHead}>
              <strong>Items</strong>
            </div>
            <Card.Body style={{ padding: 16 }}>
              <Table hover responsive className="align-middle mb-3">
                <thead>
                  <tr>
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
                        <img src={it.image} alt="" style={S.thumb} />
                        <span className="fw-semibold">{it.title}</span>
                      </td>
                      <td>${Number(it.price).toFixed(2)}</td>
                      <td className="text-center">
                        <div className="d-inline-flex align-items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            style={S.qtyBtn}
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
                            style={S.qtyBtn}
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
                          style={S.qtyBtn}
                          onClick={() => removeFromCart(it.id)}
                          title="Remove"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
                <Button
                  variant="outline-secondary"
                  style={S.outlineBtn}
                  onClick={clearCart}
                >
                  <FaTrash className="me-2" />
                  Clear Cart
                </Button>

                <div className="ms-auto d-flex align-items-center gap-3">
                  <div className="fs-6">
                    Subtotal:{" "}
                    <Badge bg="success" pill>
                      ${subtotal.toFixed(2)}
                    </Badge>
                  </div>
                  <Button style={S.greenBtn} onClick={() => nav("/checkout")}>
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline-secondary"
                    style={S.outlineBtn}
                    onClick={() => nav("/")}
                  >
                    <FaArrowLeft className="me-2" />
                    Continue shopping
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}
