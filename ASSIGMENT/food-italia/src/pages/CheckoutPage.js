// src/pages/CheckoutPage.jsx
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { createOrder } from "../api";
import { Container, Card, Button, Alert, Badge } from "react-bootstrap";
import { useToast } from "../contexts/ToastContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaShoppingCart, FaDollarSign, FaArrowLeft } from "react-icons/fa";
import "../styles/page-italia.css";

export default function CheckoutPage(){
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const { show } = useToast();
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const placeOrder = async ()=>{
    setErr("");
    try{
      if (!user) throw new Error("Please sign in to checkout");
      if (!items.length) throw new Error("Cart is empty");
      const order = { userid: user.id, items, total: subtotal, date: new Date().toISOString() };
      await createOrder(order);
      clearCart();
      show("Order placed!", "success");
      nav("/"); // ➜ về trang chính sau khi đặt hàng
    }catch(e){ setErr(e.message || "Checkout failed"); }
  };

  return (
    <div className="it-page">
      <Container style={{maxWidth:760}}>
        <h3 className="it-page-title">
          <FaClipboardList className="it-title-icon" /> Checkout
          <span className="it-pill ms-2"><FaShoppingCart/> Items: {items.length}</span>
          <span className="it-pill ms-2"><FaDollarSign/> ${subtotal.toFixed(2)}</span>
        </h3>

        <Card className="it-card">
          <div className="it-card-head"><strong>Order summary</strong></div>
          <Card.Body className="it-card-body">
            {err && <Alert variant="danger" className="mb-3">{err}</Alert>}

            {items.length === 0 ? (
              <div className="it-empty">
                <div className="it-empty-icon">🧾</div>
                <div className="lead mb-2">Your cart is empty</div>
                <div className="text-muted mb-3">Add some pasta, pizza or tiramisù to checkout.</div>
                <Button className="it-btn it-btn-green" onClick={()=>nav("/")}>
                  <FaArrowLeft className="me-2"/>Back to Home
                </Button>
              </div>
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>Items <Badge bg="light" text="dark">{items.length}</Badge></div>
                  <div className="fs-5">Total: <strong>${subtotal.toFixed(2)}</strong></div>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <Button className="it-btn it-btn-green" onClick={placeOrder}>
                    Confirm &amp; Place Order
                  </Button>
                  <Button variant="outline-secondary" className="it-btn" onClick={()=>nav("/cart")}>
                    Edit Cart
                  </Button>
                  <Button variant="outline-secondary" className="it-btn ms-auto" onClick={()=>nav("/")}>
                    <FaArrowLeft className="me-2"/>Continue Shopping
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
