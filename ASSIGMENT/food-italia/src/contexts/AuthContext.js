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
    setUser({ id: acc.id, name: acc.username || acc.name, email: acc.email });
  }, []);

  const register = useCallback(async (data) => {
    // data: {name,email,avatar,username,password,secretQuestion,answer}
    const created = await createAccount({
      username: data.username,
      email: data.email,
      password: data.password,
      secretQuestion: data.secretQuestion,
      answer: data.answer,
      name: data.name,
      avatar: data.avatar,
      wishlist: [],        // để dành cho option lưu wishlist theo account
    });
    setUser({ id: created.id, name: created.username || created.name, email: created.email });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({
    user, login, logout, register, redirectAfterLogin, setRedirectAfterLogin
  }), [user, login, logout, register, redirectAfterLogin]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(){ return useContext(AuthCtx); }
