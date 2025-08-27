import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { getOrdersByUser, getProduct } from "../api"; // <-- thêm getProduct

export default function ProfilePage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function hydrateOrders(list) {
      const safe = Array.isArray(list) ? list : [];
      return Promise.all(
        safe.map(async (o) => {
          const rawItems = Array.isArray(o.items) ? o.items : [];
          const items = await Promise.all(
            rawItems.map(async (it) => {
              // Nếu là object đã có title/price thì giữ
              if (it && typeof it === "object") {
                return {
                  id: it.id,
                  title: it.title ?? it.name ?? (it.id != null ? `#${it.id}` : "Unknown"),
                  qty: it.qty ?? 1,
                  unitPrice: Number(it.unitPrice ?? it.price ?? 0),
                };
              }
              // Nếu chỉ là ID -> gọi API lấy product để có tên + giá
              try {
                const p = await getProduct(it);
                return {
                  id: p?.id ?? it,
                  title: p?.title ?? p?.name ?? `#${it}`,
                  qty: 1,
                  unitPrice: Number(p?.salePrice ?? p?.price ?? 0),
                };
              } catch {
                return { id: it, title: `#${it}`, qty: 1, unitPrice: 0 };
              }
            })
          );
          return { ...o, items };
        })
      );
    }

    async function run() {
      if (!user) return;
      try {
        const list = await getOrdersByUser(user.id);
        const filled = await hydrateOrders(list || []);
        if (!ignore) setOrders(filled);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [user]);

  if (!user) {
    return (
      <Container className="py-4">
        <Card className="shadow-sm p-4 text-center">
          <h5>Please sign in to view your profile.</h5>
        </Card>
      </Container>
    );
  }

  const addr = user.address || {};

  return (
    <Container className="py-4" style={{ maxWidth: 980 }}>
      {/* -------- Profile info (read-only) -------- */}
      <Card className="shadow-sm border-0 mb-3">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Profile</h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <div className="small text-muted">Full name</div>
              <div className="fw-semibold">{user.name || "-"}</div>
            </Col>
            <Col md={6}>
              <div className="small text-muted">Email</div>
              <div className="fw-semibold">{user.email || "-"}</div>
            </Col>
            <Col md={4}>
              <div className="small text-muted">Country</div>
              <div className="fw-semibold">{addr.country || "-"}</div>
            </Col>
            <Col md={4}>
              <div className="small text-muted">City</div>
              <div className="fw-semibold">{addr.city || "-"}</div>
            </Col>
            <Col md={4}>
              <div className="small text-muted">Street</div>
              <div className="fw-semibold">{addr.street || "-"}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* -------- Order history -------- */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Order history</h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-muted">Loading orders…</div>
          ) : orders.length === 0 ? (
            <div className="text-muted">No orders yet.</div>
          ) : (
            <Table hover responsive className="mb-0 align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Items</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>
                      {(o.items || [])
                        .map((i) => {
                          if (!i) return "-";
                          if (typeof i === "object") {
                            const title = i.title ?? i.name ?? `#${i.id}`;
                            const price = i.unitPrice ?? i.price ?? 0;
                            const qty = i.qty ? ` x${i.qty}` : "";
                            return `${title} ($${Number(price).toFixed(2)})${qty}`;
                          }
                          return `#${i}`; // hiếm khi gặp vì đã hydrate
                        })
                        .join(", ")}
                    </td>
                    <td className="text-end">
                      ${Number(o.total || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
