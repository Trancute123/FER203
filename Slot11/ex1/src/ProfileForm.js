import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Toast, Modal, Card } from "react-bootstrap";

function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);

  const isValidName = name.trim() !== "";
  const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
  const isValidAge = Number(age) >= 1;

  const isFormValid = isValidName && isValidEmail && isValidAge;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true); // bật check lỗi
    if (isFormValid) {
      setShowToast(true); // ✅ hiện Toast khi hợp lệ
      setShowModal(true);
      onSubmit({ name, email, age });
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-white"
      >
        {/* Name */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={validated && !isValidName}
          />
          <Form.Control.Feedback type="invalid">
            Name cannot be empty!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={validated && !isValidEmail}
          />
          <Form.Control.Feedback type="invalid">
            Invalid email!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Age */}
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            isInvalid={validated && !isValidAge}
          />
          <Form.Control.Feedback type="invalid">
            Age must be at least 1!
          </Form.Control.Feedback>
        </Form.Group>

        {/* ✅ Không disable nút nữa */}
        <Button
          type="submit"
          className="w-100"
          style={{
            background: "linear-gradient(to right, #667eea, #764ba2)",
            border: "none",
          }}
        >
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
        <Toast.Body className="text-white text-center">
          Submitted successfully!
        </Toast.Body>
      </Toast>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p>
                <b>Name:</b> {name}
              </p>
              <p>
                <b>Email:</b> {email}
              </p>
              <p>
                <b>Age:</b> {age}
              </p>
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
