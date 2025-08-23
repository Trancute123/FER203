// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // load user từ localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("auth_user") || "null");
    if (saved) setUser(saved);
  }, []);

  // lưu user khi thay đổi
  useEffect(() => {
    localStorage.setItem("auth_user", JSON.stringify(user));
  }, [user]);

  const login = (email) => setUser({ email });
  const logout = () => setUser(null);   // ✅ chỉ cần thế này
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
