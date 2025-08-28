// src/context/ToastContext.jsx
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message, variant = "primary", ms = 2000) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, message, variant }]);
      if (ms > 0) setTimeout(() => dismiss(id), ms);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <ToastContainer
        className="p-3"
        style={{
          position: "fixed",
          top: 72, // chỉnh số px bạn muốn
          right: 16, // cách mép phải
          zIndex: 2000,
        }}
      >
        {" "}
        {toasts.map((t) => (
          <Toast key={t.id} bg={t.variant} onClose={() => dismiss(t.id)} show>
            <Toast.Body className="text-white">{t.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
