import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

// Regex kiểm tra email hợp lệ
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ValidatedForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Trạng thái hợp lệ
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // Thông báo lỗi
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Cờ theo dõi xem người dùng đã nhập hay chưa
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  // Xác thực email
  useEffect(() => {
    if (touchedEmail) {
      if (!emailRegex.test(email)) {
        setIsEmailValid(false);
        setEmailError("Email không hợp lệ!");
      } else {
        setIsEmailValid(true);
        setEmailError("");
      }
    }
  }, [email, touchedEmail]);

  // Xác thực password
  useEffect(() => {
    if (touchedPassword) {
      if (password.length < 8) {
        setIsPasswordValid(false);
        setPasswordError("Mật khẩu phải có ít nhất 8 ký tự!");
      } else {
        setIsPasswordValid(true);
        setPasswordError("");
      }
    }
  }, [password, touchedPassword]);

  const isFormValid = isEmailValid && isPasswordValid && email && password;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đăng nhập thành công!");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouchedEmail(true)}
          isInvalid={!isEmailValid && touchedEmail}
        />
        <Form.Control.Feedback type="invalid">
          {emailError}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password" className="mt-3">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouchedPassword(true)}
          isInvalid={!isPasswordValid && touchedPassword}
        />
        <Form.Control.Feedback type="invalid">
          {passwordError}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="mt-4"
        disabled={!isFormValid}
      >
        Submit
      </Button>
    </Form>
  );
}

export default ValidatedForm;
