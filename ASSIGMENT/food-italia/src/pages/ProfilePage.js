import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { getOrdersByUser, updateAccount } from "../api";
import { useToast } from "../contexts/ToastContext";
import { AiOutlineCamera } from "react-icons/ai";

const MAX_MB = 2;

export default function ProfilePage() {
  const { user, setUser } = useAuth(); // cần setUser trong AuthContext
  const { show } = useToast();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // ---- edit mode & form fields ----
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [country, setCountry] = useState(user?.address?.country || "Vietnam");
  const [city, setCity] = useState(user?.address?.city || "");
  const [street, setStreet] = useState(user?.address?.street || "");
  const [avatar, setAvatar] = useState(user?.avatar || ""); // dataURL
  const [avatarErr, setAvatarErr] = useState("");

  // sync khi user thay đổi từ context
  useEffect(() => {
    if (!user) return;
    setName(user.name || "");
    setCountry(user.address?.country || "Vietnam");
    setCity(user.address?.city || "");
    setStreet(user.address?.street || "");
    setAvatar(user.avatar || "");
  }, [user]);

  // tải orders
  useEffect(() => {
    let ignore = false;
    async function run() {
      if (!user) return;
      try {
        const list = await getOrdersByUser(user.id);
        if (!ignore) setOrders(list);
      } finally {
        if (!ignore) setLoadingOrders(false);
      }
    }
    run();
    return () => {
      ignore = true;
    };
  }, [user]);

  const onPickAvatar = useCallback((file) => {
    if (!file) return;
    setAvatarErr("");

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setAvatarErr("Only JPG/PNG is allowed.");
      return;
    }
    const mb = file.size / (1024 * 1024);
    if (mb > MAX_MB) {
      setAvatarErr(`Max size is ${MAX_MB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result.toString());
    reader.readAsDataURL(file);
  }, []);

  if (!user) {
    return (
      <Container className="py-4">
        <Card className="p-4 text-center shadow-sm">
          <h5>Please sign in to view your profile.</h5>
        </Card>
      </Container>
    );
  }

  const onCancel = () => {
    setName(user.name || "");
    setCountry(user.address?.country || "Vietnam");
    setCity(user.address?.city || "");
    setStreet(user.address?.street || "");
    setAvatar(user.avatar || "");
    setAvatarErr("");
    setEditing(false);
  };

  const onSave = async () => {
    // validate cơ bản
    if (!name.trim()) return show("Full name is required", "danger");
    if (!city.trim()) return show("City is required", "danger");
    if (!street.trim()) return show("Street is required", "danger");
    if (avatarErr) return show(avatarErr, "danger");

    const payload = {
      ...user,
      name: name.trim(),
      avatar, // base64 (đủ cho demo)
      address: { country, city: city.trim(), street: street.trim() },
    };

    try {
      const updated = await updateAccount(user.id, payload);
      setUser(updated);
      show("Profile updated", "success");
      setEditing(false);
    } catch (e) {
      show(e?.message || "Failed to update", "danger");
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 980 }}>
      {/* Profile card */}
      <Card className="shadow-sm border-0">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Profile</span>
          {!editing ? (
            <Button variant="outline-success" size="sm" onClick={() => setEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="d-flex gap-2">
              <Button variant="secondary" size="sm" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="success" size="sm" onClick={onSave}>
                Save changes
              </Button>
            </div>
          )}
        </Card.Header>

        <Card.Body>
          <Row className="g-4">
            {/* Avatar */}
            <Col md={4} className="d-flex flex-column align-items-center">
              <div
                className="mb-2"
                style={{
                  width: 190,
                  height: 190,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 30% 30%, #fff 0%, #f8fafb 50%, #eef3f0 100%)",
                  border: "3px solid #dbe7df",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                }}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                    No image
                  </div>
                )}

                {editing && (
                  <>
                    <label
                      htmlFor="pick-avatar"
                      title="Choose picture"
                      className="bg-white rounded-circle shadow d-inline-flex align-items-center justify-content-center"
                      style={{
                        position: "absolute",
                        right: 10,
                        bottom: 10,
                        width: 40,
                        height: 40,
                        cursor: "pointer",
                        border: "1px solid #e3e8e5",
                      }}
                    >
                      <AiOutlineCamera />
                    </label>
                    <input
                      id="pick-avatar"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="d-none"
                      onChange={(e) => onPickAvatar(e.target.files?.[0])}
                    />
                  </>
                )}
              </div>
              <small className="text-muted">JPG/PNG ≤ {MAX_MB}MB</small>
              {avatarErr && <div className="text-danger small mt-1">{avatarErr}</div>}
            </Col>

            {/* Info form */}
            <Col md={8}>
              <Row className="g-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!editing}
                      placeholder="Your full name"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      disabled={!editing}
                    >
                      <option>Vietnam</option>
                      <option>Korea</option>
                      <option>Italy</option>
                      <option>Japan</option>
                      <option>France</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={!editing}
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      disabled={!editing}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Orders */}
      <Card className="shadow-sm mt-3 border-0">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Order history</h5>
        </Card.Header>
        <Card.Body>
          {loadingOrders ? (
            <div className="text-muted">Loading orders…</div>
          ) : orders.length === 0 ? (
            <div className="text-muted">No orders yet.</div>
          ) : (
            <Table striped hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{new Date(o.date || Date.now()).toLocaleString()}</td>
                    <td>{(o.items || []).map((i) => i.title).join(", ")}</td>
                    <td className="text-end">${Number(o.total || 0).toFixed(2)}</td>
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
