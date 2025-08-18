import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Toast, Modal, Card } from "react-bootstrap";

function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isValidName = name.trim() !== "";//tên không được rỗng.
  const isValidEmail = email.includes("@");//email phải chứa ký tự @.
  const isValidAge = Number(age) >= 1;//tuổi phải ≥ 1.

  const isFormValid = isValidName && isValidEmail && isValidAge; //chỉ true nếu tất cả đều hợp lệ → dùng để bật/tắt nút Submit.

  const handleSubmit = (e) => { //hàm sibmit form
    e.preventDefault();// ngăn reload trang mặc định
    if (isFormValid) {
      setShowToast(true);
      setShowModal(true);
      onSubmit({ name, email, age });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="p-3 border rounded">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}//cập nhật state khi người dùng nhập.
            isInvalid={!isValidName && name !== ""}//nếu name không hợp lệ thì input đỏ.
          />
          <Form.Control.Feedback type="invalid" >
            Name cannot be empty!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!isValidEmail && email !== ""}
          />
          <Form.Control.Feedback type="invalid">
            Invalid email!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            isInvalid={!isValidAge && age !== ""}
          />
          <Form.Control.Feedback type="invalid">
            Age must be at least 1!
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      </Form>

      {/* Toast */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2000}
        autohide
        bg="success"
        className="mt-3"
      >
        <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><b>Name:</b> {name}</p>
              <p><b>Email:</b> {email}</p>
              <p><b>Age:</b> {age}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;
