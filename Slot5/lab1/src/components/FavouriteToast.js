import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function FavouriteToast({ show, message, onClose }) {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast bg="success" onClose={onClose} show={show} autohide delay={5000}>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
