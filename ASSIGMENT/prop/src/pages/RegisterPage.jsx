import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import defaultAvatar from "../assets/react.svg";
import { Button, Form, Card, Alert } from "react-bootstrap";

export default function RegisterPage() {

const secretQuestions = [
  "What is your mother's maiden name?",
  "What was your first pet's name?",
  "What is your favorite book?",
  "What city were you born in?"
];

const initialForm = {
  name: "",
  avatar: null,
  email: "",
  password: "",
  confirmPassword: "",
  secret_question: "",
  answer: ""
};

  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Validation
  const isAboutValid = form.name.trim() && form.avatar;
  const isAccountValid =
    /\S+@\S+\.\S+/.test(form.email) &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword;
  const isSecurityValid = form.secret_question && form.answer.trim();

  // Handle avatar upload
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
      setTouched({ ...touched, avatar: true });
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Xử lý lưu avatar (giả sử chỉ lưu tên file, thực tế cần upload lên server)
    let avatarPath = avatarPreview;
    if (form.avatar) {
      avatarPath = `images/avatars/${form.avatar.name}`;
      // Thực tế cần upload file lên server hoặc lưu vào public/images/avatars
    }

    // Tạo account object
    const newAccount = {
      email: form.email,
      password: form.password,
      isActive: true,
      name: form.name,
      avatar: avatarPath,
      secret_question: form.secret_question,
      answer: form.answer
    };

    // Gọi API hoặc cập nhật db.json (giả lập với fetch tới json-server)
    try {
      await fetch("http://localhost:3001/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount)
      });
      toast("Đăng ký thành công!", { type: "success" });
      navigate("/login");
    } catch (err) {
      toast("Đăng ký thất bại!", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ minWidth: 350, maxWidth: 400 }} className="shadow p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center" style={{ fontSize: 15 }}>
            <div style={{ fontWeight: step === 1 ? 'bold' : 'normal', color: step >= 1 ? '#0d6efd' : '#888' }}>1. Thông tin</div>
            <div style={{ fontWeight: step === 2 ? 'bold' : 'normal', color: step >= 2 ? '#0d6efd' : '#888' }}>2. Tài khoản</div>
            <div style={{ fontWeight: step === 3 ? 'bold' : 'normal', color: step === 3 ? '#0d6efd' : '#888' }}>3. Bảo mật</div>
          </div>
          <div className="progress mt-2" style={{ height: 6 }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${step * 33.33}%`, backgroundColor: '#0d6efd' }}
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={3}
            />
          </div>
        </div>
        <h3 className="mb-4 text-center">Đăng ký tài khoản</h3>
        <Form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Nhập họ tên"
                  isInvalid={touched.name && !form.name.trim()}
                />
                <Form.Control.Feedback type="invalid">Vui lòng nhập họ tên</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAvatar">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  required
                  isInvalid={touched.avatar && !form.avatar}
                />
                <Form.Control.Feedback type="invalid">Vui lòng chọn ảnh đại diện</Form.Control.Feedback>
                <div className="text-center mt-2">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    style={{ width: 80, height: 80, borderRadius: "50%" }}
                  />
                </div>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  type="button"
                  variant="primary"
                  disabled={!isAboutValid}
                  onClick={() => {
                    setTouched({ ...touched, name: true, avatar: true });
                    if (isAboutValid) setStep(2);
                  }}
                >
                  Tiếp tục
                </Button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  type="email"
                  placeholder="Nhập email"
                  isInvalid={touched.email && !/\S+@\S+\.\S+/.test(form.email)}
                />
                <Form.Control.Feedback type="invalid">Email không hợp lệ</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    type={showPassword ? "text" : "password"}
                    minLength={6}
                    placeholder="Nhập mật khẩu"
                    isInvalid={touched.password && form.password.length < 6}
                  />
                  <span
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888' }}
                    onClick={() => setShowPassword(s => !s)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <Form.Control.Feedback type="invalid">Mật khẩu tối thiểu 6 ký tự</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    isInvalid={touched.confirmPassword && form.confirmPassword !== form.password}
                  />
                  <span
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888' }}
                    onClick={() => setShowConfirmPassword(s => !s)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <Form.Control.Feedback type="invalid">Mật khẩu xác nhận không khớp</Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                  Quay lại
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  disabled={!isAccountValid}
                  onClick={() => {
                    setTouched({ ...touched, email: true, password: true, confirmPassword: true });
                    if (isAccountValid) setStep(3);
                  }}
                >
                  Tiếp tục
                </Button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <Form.Group className="mb-3" controlId="formSecretQuestion">
                <Form.Label>Câu hỏi bảo mật</Form.Label>
                <Form.Select
                  name="secret_question"
                  value={form.secret_question}
                  onChange={handleChange}
                  required
                  isInvalid={touched.secret_question && !form.secret_question}
                >
                  <option value="">--Chọn câu hỏi--</option>
                  {secretQuestions.map((q, idx) => (
                    <option key={idx} value={q}>{q}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Vui lòng chọn câu hỏi bảo mật</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAnswer">
                <Form.Label>Câu trả lời</Form.Label>
                <Form.Control
                  name="answer"
                  value={form.answer}
                  onChange={handleChange}
                  required
                  placeholder="Nhập câu trả lời"
                  isInvalid={touched.answer && !form.answer.trim()}
                />
                <Form.Control.Feedback type="invalid">Vui lòng nhập câu trả lời</Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button type="button" variant="secondary" onClick={() => setStep(2)}>
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  variant="success"
                  disabled={!isSecurityValid || loading}
                  onClick={() => setTouched({ ...touched, secret_question: true, answer: true })}
                >
                  {loading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
              </div>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
}