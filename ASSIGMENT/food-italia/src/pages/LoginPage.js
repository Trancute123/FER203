import { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const emailOk = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const pwOk = (s) => s.length >= 5; // yêu cầu đăng nhập cơ bản; (đăng ký mới chặt chẽ)

export default function LoginPage() {
  const [sp] = useSearchParams();
  const redirect_uri = sp.get("redirect_uri") || "/";

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("123456");
  const [errs, setErrs] = useState({});
  const navigate = useNavigate();

  const { login, setRedirectAfterLogin } = useAuth();
  const { show } = useToast();

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!emailOk(email)) e.email = "Please enter a valid email";
    if (!password) e.password = "Password is required";
    else if (!pwOk(password)) e.password = "Password is too short";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      setRedirectAfterLogin(redirect_uri);
      await login(email, password);
      show("Signed in!", "success");
      navigate(redirect_uri);
    } catch (err) {
      setErrs({ form: err.message || "Invalid email or password" });
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 520 }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-3">Sign in</h3>

          {errs.form && <div className="form-error mb-2">{errs.form}</div>}

          <Form onSubmit={onSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errs.email}
                placeholder="you@example.com"
              />
              {errs.email && <div className="form-error">{errs.email}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errs.password}
              />
              {errs.password && <div className="form-error">{errs.password}</div>}
            </Form.Group>

            <div className="d-flex align-items-center gap-3">
              <Button type="submit" variant="success">Sign in</Button>
              <Link to="/register" className="ms-auto">Create an account</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
