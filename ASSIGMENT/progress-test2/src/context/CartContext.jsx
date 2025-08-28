// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(x => x.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: (next[idx].qty || 1) + qty };
        return next;
      }
      return [...prev, { ...product, qty }];
    });
  }, []);

  const remove = useCallback((id) => {
    setItems(prev => prev.filter(x => x.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const count = items.reduce((s, it) => s + (it.qty || 1), 0);
  const total = items.reduce((s, it) => s + Number(it.price || 0) * (it.qty || 1), 0);

  const value = useMemo(
    () => ({ items, addToCart, remove, clear, count, total }),
    [items, addToCart, remove, clear, count, total]
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


