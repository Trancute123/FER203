import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";

export default function RequestFormModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Recipe Request Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required />
            <Form.Control.Feedback type="invalid">
              Please enter your name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Desired Ingredient</Form.Label>
            <Form.Control type="text" placeholder="e.g., chicken breast, avocado..." />
            <Form.Control.Feedback type="invalid">
              Please enter an ingredient
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Prep Time</Form.Label>
            <Form.Select defaultValue="10">
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
            <Form.Control as="textarea" rows={4} placeholder="Add any notes here..." />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          <FaPaperPlane className="me-2" />
          Submit Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
