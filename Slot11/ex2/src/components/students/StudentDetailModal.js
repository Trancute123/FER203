import React from "react";
import { Modal, Button, Card } from "react-bootstrap";

function StudentDetailModal({ student, show, onHide }) {
  if (!student) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>{student.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <Card className="border-0">
          {/* Ảnh avatar nếu có */}
          {student.avatar && (
            <Card.Img
              variant="top"
              src={student.avatar}
              alt={student.name}
              className="modal-img"
            />
          )}
          <Card.Body>
            <p><b>ID:</b> {student.id}</p>
            <p><b>Email:</b> {student.email}</p>
            <p><b>Age:</b> {student.age}</p>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-close-modal" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>

      <style>{`
        .modal-header-custom {
          background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
          color: #003366;
          font-weight: 600;
          border-bottom: none;
        }
        .modal-body-custom {
          background: #f9fbff;
          padding: 20px;
        }
        .modal-img {
          border-radius: 10px;
          margin-bottom: 15px;
          max-height: 300px;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .btn-close-modal {
          background-color: #004080 !important;
          border: none !important;
          border-radius: 20px;
          padding: 6px 16px;
          font-weight: 500;
        }
        .btn-close-modal:hover {
          background-color: #00264d !important;
        }
        .modal-content {
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,64,128,0.25);
        }
        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .modal-body-custom p {
          margin-bottom: 8px;
          font-size: 0.95rem;
          color: #333;
        }
      `}</style>
    </Modal>
  );
}

export default StudentDetailModal;
