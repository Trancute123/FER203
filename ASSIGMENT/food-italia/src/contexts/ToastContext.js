import { createContext, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastCtx = createContext({ show: () => {} });
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Hiển thị toast mới
  const show = (message, variant = "success", delay = 2500) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, variant, delay }]);
  };

  // Xóa toast theo id
  const remove = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <ToastContainer position="bottom-end" className="p-3">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            onClose={() => remove(t.id)}
            show
            autohide
            delay={t.delay}
            className={`bg-${t.variant} text-white`} // ✅ dùng className thay vì prop bg
          >
            <Toast.Body>{t.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastCtx.Provider>
  );
}
