import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Form, Button, Alert } from "react-bootstrap";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StudentForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    gender: "Nữ",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Tên không được để trống!";
    else if (form.name.trim().length < 3 || form.name.trim().length > 50) {
      e.name = "Tên phải có từ 3 đến 50 ký tự!";
    }
    const ageNum = Number(form.age);
    if (form.age === "" || form.age === null)
      e.age = "Tuổi không được để trống!";
    else if (Number.isNaN(ageNum)) e.age = "Tuổi phải là số!";
    else if (ageNum < 18 || ageNum > 100)
      e.age = "Tuổi phải nằm trong khoảng 18 đến 100!";
    if (!form.email.trim()) e.email = "Email không được để trống!";
    else if (!emailRegex.test(form.email.trim()))
      e.email = "Email không đúng định dạng!";
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      e.phone = "Số điện thoại phải có 10–15 chữ số!";
    }
    if (!form.agree) e.agree = "Bạn phải đồng ý với điều khoản.";

    setErrors(e);
    setShowAlert(Object.keys(e).length > 0);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: form.email.trim(),
      age: Number(form.age),
        avatar:
          "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=60&auto=format&fit=crop",
    });

    setForm({
      name: "",
      age: "",
      email: "",
      phone: "",
      gender: "Nữ",
      agree: false,
    });
    setErrors({});
    setShowAlert(false);
  };

  return (
    <Card
      className="mb-4"
      style={{
        border: "none",
        borderRadius: 20,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
      }}
    >
      <Card.Body style={{ padding: "24px 28px" }}>
        <Card.Title
          className="mb-3"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#2c3e50",
            textAlign: "center",
          }}
        >
          Thêm học sinh
        </Card.Title>

        {showAlert && (
          <Alert
            variant="danger"
            className="mb-3"
            style={{
              borderRadius: 10,
              fontSize: "0.9rem",
              backgroundColor: "#fdecea",
              color: "#b71c1c",
            }}
          >
            <strong>Lỗi:</strong> Vui lòng kiểm tra các trường nhập.
          </Alert>
        )}

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label style={{ fontWeight: 600 }}>Tên</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="Nguyễn Văn A"
              style={{ borderRadius: 10 }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label style={{ fontWeight: 600 }}>Tuổi</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              isInvalid={!!errors.age}
              placeholder="18"
              style={{ borderRadius: 10 }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label style={{ fontWeight: 600 }}>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="abc@fe.edu.vn"
              style={{ borderRadius: 10 }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label style={{ fontWeight: 600 }}>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
              placeholder="0901234567"
              style={{ borderRadius: 10 }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGender">
            <Form.Label style={{ fontWeight: 600 }}>Giới tính</Form.Label>
            <Form.Select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              style={{ borderRadius: 10 }}
            >
              <option value="Nữ">Nữ</option>
              <option value="Nam">Nam</option>
              <option value="Khác">Khác</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAgree">
            <Form.Check
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              isInvalid={!!errors.agree}
              label="Đồng ý với điều khoản"
            />
            {errors.agree && (
              <div className="invalid-feedback d-block">{errors.agree}</div>
            )}
          </Form.Group>

          <div style={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="primary"
              style={{
                padding: "8px 24px",
                borderRadius: 10,
                fontWeight: 600,
                background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                border: "none",
              }}
            >
              Gửi
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

StudentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default StudentForm;
