import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import api from "../services/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErr, setFormErr] = useState("");          // lỗi chung (server, tài khoản bị khóa...)
  const [fieldErrs, setFieldErrs] = useState({});      // lỗi từng field

  function validate() {
    const errs = {};
    if (!email.trim()) errs.email = "Vui lòng nhập email.";
    else if (!EMAIL_RE.test(email.trim())) errs.email = "Email không hợp lệ.";

    if (!password) errs.password = "Vui lòng nhập mật khẩu.";
    else if (password.length < 6) errs.password = "Mật khẩu tối thiểu 6 ký tự.";

    setFieldErrs(errs);
    return Object.keys(errs).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();              // tự xử lý, không cho trình duyệt validate
    setFormErr("");
    if (!validate()) return;

    try {
      setLoading(true);
      const { data } = await api.get("/accounts", { params: { email, password } });
      const user = Array.isArray(data) ? data[0] : null;

      if (!user) {
        setFormErr("Email hoặc mật khẩu không đúng.");
        return;
      }
      if (user.isActive === false) {
        setFormErr("Tài khoản đang bị khóa hoặc chưa kích hoạt.");
        return;
      }

      localStorage.setItem("auth", JSON.stringify({ email: user.email, isActive: user.isActive }));
      nav(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setFormErr("Không thể đăng nhập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-3">Login</h3>

              {formErr && <Alert variant="danger">{formErr}</Alert>}

              {/* TẮT HTML5 validation: noValidate */}
              <Form noValidate onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  {/* dùng type="text" để chắc chắn không bật tooltip của browser */}
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="username"
                    isInvalid={!!fieldErrs.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {fieldErrs.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    isInvalid={!!fieldErrs.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {fieldErrs.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Sign in"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
