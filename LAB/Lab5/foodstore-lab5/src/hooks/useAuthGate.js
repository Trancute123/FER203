import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Dùng cho hành động cần login (VD: Favourite, Checkout…)
 * Gọi gate({ to: "/login", intent: { type: "fav", productId }})
 * Trả về true nếu đã đăng nhập, false nếu đã chuyển hướng sang login/register.
 */
export function useAuthGate(defaultTo = "/login"){
  const { user } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();

  return (opts = {}) => {
    if (user) return true;
    const to = opts.to || defaultTo;
    const intent = opts.intent || null;
    nav(to, { replace: true, state: { from: loc.pathname, intent } });
    return false;
  };
}
