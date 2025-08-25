// src/pages/CartPage.jsx
import { useCart } from "../contexts/CartContext";
import { Container, Table, Button, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash, FaCartArrowDown, FaArrowLeft } from "react-icons/fa";
import "../styles/page-italia.css";

export default function CartPage(){
  const { items, subtotal, incQty, decQty, removeFromCart, clearCart } = useCart();
  const nav = useNavigate();

  return (
    <div className="it-page">
      <Container>
        <h3 className="it-page-title"><FaCartArrowDown className="it-title-icon" /> Your Cart</h3>

        {!items.length ? (
          <div className="it-empty">
            <div className="it-empty-icon">🛒</div>
            <div className="lead mb-2">Cart is empty</div>
            <div className="text-muted mb-3">Hungry? Add fresh pasta, pizza, tiramisù…</div>
            <Button className="it-btn it-btn-green" onClick={()=>nav("/")}>Start shopping</Button>
          </div>
        ) : (
          <Card className="it-card">
            <div className="it-card-head"><strong>Items</strong></div>
            <Card.Body className="it-card-body">
              <Table hover responsive className="align-middle it-table mb-3">
                <thead>
                  <tr><th>Item</th><th>Price</th><th className="text-center">Qty</th><th className="text-end">Total</th><th></th></tr>
                </thead>
                <tbody>
                  {items.map(it=>(
                    <tr key={it.id}>
                      <td className="d-flex align-items-center gap-2">
                        <img src={it.image} alt="" className="it-img-thumb"/>
                        <span className="fw-semibold">{it.title}</span>
                      </td>
                      <td>${Number(it.price).toFixed(2)}</td>
                      <td className="text-center">
                        <div className="d-inline-flex align-items-center gap-2">
                          <Button size="sm" variant="outline-secondary" className="it-qtybtn" onClick={()=>decQty(it.id)}><FaMinus/></Button>
                          <span className="fw-semibold" style={{minWidth:24, display:'inline-block'}}>{it.qty}</span>
                          <Button size="sm" variant="outline-secondary" className="it-qtybtn" onClick={()=>incQty(it.id)}><FaPlus/></Button>
                        </div>
                      </td>
                      <td className="text-end">${(it.qty * it.price).toFixed(2)}</td>
                      <td className="text-end">
                        <Button size="sm" variant="outline-danger" className="it-qtybtn" onClick={()=>removeFromCart(it.id)}><FaTrash/></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
                <Button variant="outline-secondary" className="it-btn" onClick={clearCart}>
                  <FaTrash className="me-2"/>Clear Cart
                </Button>

                <div className="ms-auto d-flex align-items-center gap-3">
                  <div className="fs-5">Subtotal: <Badge bg="success">${subtotal.toFixed(2)}</Badge></div>
                  <Button className="it-btn it-btn-green" onClick={()=>nav("/checkout")}>
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline-secondary" className="it-btn" onClick={()=>nav("/")}>
                    <FaArrowLeft className="me-2"/>Continue shopping
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
