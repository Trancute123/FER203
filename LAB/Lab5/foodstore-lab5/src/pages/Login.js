import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Form, Card, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [values, setValues] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({});
  const [showPwd, setShowPwd] = useState(false);

  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const validate = (v = values) => {
    const e = {};
    if (!v.username.trim()) e.username = "Username is required";
    else if (v.username.trim().length < 7)
      e.username = "Username must be at least 7 characters";
    if (!v.password) e.password = "Password is required";
    return e;
  };

  const errors = validate(values);
  const isInvalid = (name) => touched[name] && !!errors[name];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    const errs = validate(values);
    if (Object.keys(errs).length > 0) return;

    // ✅ đăng nhập thành công → dùng username
    login(values.username);
    nav(loc.state?.from || "/products", { replace: true });
  };

  return (
    <div className="container reg-wrap">
      <Card className="reg-card shadow-lg border-0 rounded-4">
        <Card.Body className="p-4 p-md-5">
          <h2 className="fw-bold mb-3 text-center">Login</h2>
          <p className="text-muted mb-4 text-center">
            Enter your username and password to continue
          </p>

          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="fw-semibold">Username</Form.Label>
              <Form.Control
                name="username"
                placeholder="Your username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={isInvalid("username")}
                isValid={touched.username && !errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={isInvalid("password")}
                  isValid={touched.password && !errors.password}
                />
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <FaEyeSlash /> : <FaEye />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button type="submit" className="reg-submit w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
