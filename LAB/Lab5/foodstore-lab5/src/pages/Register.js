import React, { useState } from "react";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [touched, setTouched] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showCpwd, setShowCpwd] = useState(false);

  const nav = useNavigate();
  const { login } = useAuth();

  const validate = (v = values) => {
    const e = {};
    if (!v.username.trim()) e.username = "Username is required";
    else if (v.username.trim().length < 7)
      e.username = "Username must be at least 7 characters";
    if (!v.email.trim()) e.email = "Email is required";
    else if (!EMAIL_RE.test(v.email.trim())) e.email = "Email is invalid";
    if (!v.password) e.password = "Password is required";
    if (!v.confirm) e.confirm = "Confirm password is required";
    else if (v.confirm !== v.password) e.confirm = "Passwords do not match";
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
    setTouched({ username: true, email: true, password: true, confirm: true });
    const errs = validate(values);
    if (Object.keys(errs).length > 0) return;

    // ✅ đăng ký xong → đăng nhập bằng username & vào /products
    login(values.username);
    nav("/products", { replace: true });
  };

  return (
    <div className="container reg-wrap">
      <Card className="reg-card shadow-lg border-0 rounded-4">
        <Card.Body className="p-4 p-md-5">
          <h2 className="fw-bold mb-2">Create account</h2>
          <p className="text-muted mb-4">Join FoodStore and start shopping 🍕</p>

          <Form noValidate onSubmit={handleSubmit}>
            {/* Username */}
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="fw-semibold">User name</Form.Label>
              <Form.Control
                name="username"
                placeholder="Your user name"
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

            {/* Email */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={isInvalid("email")}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="password">
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

            {/* Confirm */}
            <Form.Group className="mb-4" controlId="confirm">
              <Form.Label className="fw-semibold">Confirm password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={showCpwd ? "text" : "password"}
                  name="confirm"
                  placeholder="••••••••"
                  value={values.confirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={isInvalid("confirm")}
                  isValid={touched.confirm && !errors.confirm}
                />
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => setShowCpwd((v) => !v)}
                  aria-label={showCpwd ? "Hide password" : "Show password"}
                >
                  {showCpwd ? <FaEyeSlash /> : <FaEye />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.confirm}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button type="submit" className="reg-submit w-100">
              Create account
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
