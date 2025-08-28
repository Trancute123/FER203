import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toastState, setToastState] = useState({ message: "", type: "info", visible: false });

  const toast = useCallback((message, { type = "info" } = {}) => {
    setToastState({ message, type, visible: true });
    setTimeout(() => setToastState(s => ({ ...s, visible: false })), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {toastState.visible && (
        <div
          style={{
            position: "fixed",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            background: toastState.type === "success"
              ? "#4caf50"
              : toastState.type === "error"
              ? "#f44336"
              : "#333",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontSize: 16,
            minWidth: 200,
            textAlign: "center"
          }}
        >
          {toastState.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext).toast;
}

// Cách dùng trong component:
// import { useToast } from "../contexts/ToastContext";
// const toast = useToast();
// toast("Đăng ký thành công!", { type: "success" });