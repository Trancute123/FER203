import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPaperPlane, FaUtensils } from "react-icons/fa";

export default function RequestFormModal({ show, onHide }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      onHide();
    }
    setValidated(true);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      style={{
        background: "rgba(0,0,0,0.3)", // mờ nền
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #fef9e7, #f5cba7)",
          borderRadius: "15px",
          border: "none",
        }}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#f4a261",
            color: "white",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <Modal.Title>
            <FaUtensils style={{ marginRight: "8px", color: "#ffdd99" }} />
            Recipe Request Form
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "20px 25px" }}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                required
                style={{
                  borderRadius: "10px",
                  border: "2px solid transparent",
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
                style={{
                  borderRadius: "10px",
                  border: "2px solid transparent",
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Desired Ingredient</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., chicken breast, avocado..."
                required
                style={{
                  borderRadius: "10px",
                  border: "2px solid transparent",
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please enter an ingredient
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Max Prep Time</Form.Label>
              <Form.Select
                defaultValue=""
                required
                style={{
                  borderRadius: "10px",
                  border: "2px solid transparent",
                }}
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a prep time
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Add any notes here..."
                style={{
                  borderRadius: "10px",
                  border: "2px solid transparent",
                }}
              />
            </Form.Group>

            <Modal.Footer style={{ borderTop: "none" }}>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#f4a261",
                  border: "none",
                  borderRadius: "30px",
                  padding: "8px 20px",
                  fontWeight: "bold",
                }}
              >
                <FaPaperPlane style={{ marginRight: "8px" }} />
                Submit Request
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}
