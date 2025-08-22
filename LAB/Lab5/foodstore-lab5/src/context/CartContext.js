import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const initial = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "LOAD":    return { items: action.payload || [] };
    case "ADD":     return { items: [...state.items, action.item] };
    case "REMOVE":  return { items: state.items.filter(i => i.id !== action.id) };
    case "CLEAR":   return { items: [] };
    default:        return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    dispatch({ type: "LOAD", payload: JSON.parse(localStorage.getItem("cart") || "[]") });
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (item) => dispatch({ type: "ADD", item });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", id });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalValue = useMemo(
    () => state.items.reduce((acc, i) => acc + Number(i.price || 0), 0).toFixed(2),
    [state.items]
  );

  return (
    <CartContext.Provider value={{ cartItems: state.items, addToCart, removeFromCart, clearCart, totalValue }}>
      {children}
    </CartContext.Provider>
  );
}
