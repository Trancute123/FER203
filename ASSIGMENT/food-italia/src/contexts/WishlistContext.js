// src/contexts/WishlistContext.jsx
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { useAuth } from "./AuthContext";
import { getAccountById, saveWishlist } from "../api";

const WLCtx = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "INIT": return action.items;
    case "SET":  return action.items;
    case "TOGGLE":
      return state.some(x => x.id === action.product.id)
        ? state.filter(x => x.id !== action.product.id)
        : [...state, action.product];
    default: return state;
  }
}

export default function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [items, dispatch] = useReducer(reducer, []);

  // Load initial
  useEffect(() => {
    let stop = false;

    async function load() {
      if (user) {
        try {
          const acc = await getAccountById(user.id);
          if (!stop) dispatch({ type: "INIT", items: acc.wishlist || [] });
        } catch {
          if (!stop) dispatch({ type: "INIT", items: [] });
        }
      } else {
        try { dispatch({ type: "INIT", items: JSON.parse(localStorage.getItem("wishlist") || "[]") }); }
        catch { dispatch({ type: "INIT", items: [] }); }
      }
    }
    load();
    return () => { stop = true; };
  }, [user]);

  // Persist
  useEffect(() => {
    if (!user) {
      localStorage.setItem("wishlist", JSON.stringify(items));
    }
  }, [items, user]);

  // Toggle + sync DB nếu có user
  const toggle = async (product) => {
    const next = reducer(items, { type: "TOGGLE", product });
    dispatch({ type: "SET", items: next });

    if (user) {
      try { await saveWishlist(user.id, next); } catch {}
    }
  };

  const ids = useMemo(() => new Set(items.map(x => x.id)), [items]);
  return <WLCtx.Provider value={{ items, ids, toggle }}>{children}</WLCtx.Provider>;
}

export const useWishlist = () => useContext(WLCtx);
