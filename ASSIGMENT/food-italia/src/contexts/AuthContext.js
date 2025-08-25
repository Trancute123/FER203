import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { getAccountByEmail, createAccount } from "../api";

const AuthCtx = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")||"null"); } catch { return null; }
  });
  const [redirectAfterLogin, setRedirectAfterLogin] = useState("/");

  useEffect(() => { localStorage.setItem("user", JSON.stringify(user)); }, [user]);

  const login = useCallback(async (email, password) => {
    const acc = await getAccountByEmail(email);
    if (!acc || acc.password !== password) throw new Error("Invalid email or password");
    setUser({ id: acc.id, name: acc.username || acc.name, email: acc.email, avatar: acc.avatar, address: acc.address });
  }, []);

  const register = useCallback(async (data) => {
    const created = await createAccount({
      username: data.username,
      email: data.email,
      password: data.password,
      secretQuestion: data.secretQuestion,
      answer: data.answer,
      name: data.name,
      avatar: data.avatar,
      wishlist: [],
      address: data.address,
    });
    setUser({ id: created.id, name: created.username || created.name, email: created.email, avatar: created.avatar, address: created.address });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({
    user, setUser,                 // ✅ expose setUser
    login, logout, register,
    redirectAfterLogin, setRedirectAfterLogin
  }), [user, login, logout, register, redirectAfterLogin]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(){ return useContext(AuthCtx); }
