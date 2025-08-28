import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container, Row, Col, Card, Form, Button, Alert, Spinner
} from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../services/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErr, setFormErr] = useState("");
  const [fieldErrs, setFieldErrs] = useState({});

  function validate() {
    const errs = {};
    if (!email.trim()) errs.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim())) errs.email = "Invalid email address.";

    if (!password) errs.password = "Please enter your password.";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters.";

    setFieldErrs(errs);
    return Object.keys(errs).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setFormErr("");
    if (!validate()) return;

    try {
      setLoading(true);
      const { data } = await api.get("/accounts", { params: { email, password } });
      const user = Array.isArray(data) ? data[0] : null;

      if (!user) return setFormErr("Incorrect email or password.");
      if (user.isActive === false) return setFormErr("Your account is locked or not activated.");

      localStorage.setItem("auth", JSON.stringify({ email: user.email, isActive: user.isActive }));
      nav(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setFormErr("Unable to login. Please try again.");
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

              <Form noValidate onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
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

                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      isInvalid={!!fieldErrs.password}
                    />
                    <span
                      onClick={() => setShowPassword((v) => !v)}
                      title={showPassword ? "Hide password" : "Show password"}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#666",
                        fontSize: 20,
                        lineHeight: 1
                      }}
                    >
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>

                    <Form.Control.Feedback type="invalid">
                      {fieldErrs.password}
                    </Form.Control.Feedback>
                  </div>
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
