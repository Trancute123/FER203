import React from "react";
import { Toast, ToastContainer } from "react-bootstrap"; // Toast hiển thị thông báo

export default function FavouriteToast({ show, message, onClose }) {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      {/* bg="success" => nền xanh, autohide => tự ẩn sau delay */}
      <Toast bg="success" onClose={onClose} show={show} autohide delay={5000}>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
