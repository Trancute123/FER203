// src/contexts/AuthContext.jsx
import {
  createContext, useContext, useEffect, useMemo, useState, useCallback
} from "react";
import { getAccountByEmail, createAccount, updateAccount } from "../api";

const AuthCtx = createContext();

export default function AuthProvider({ children }) {
  // 1) Khởi tạo user từ localStorage (giữ đăng nhập sau khi reload)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  });
  // 2) URL sẽ quay về sau khi login
  const [redirectAfterLogin, setRedirectAfterLogin] = useState("/");

  // 3) Đồng bộ user vào localStorage mỗi lần thay đổi
  useEffect(() => { localStorage.setItem("user", JSON.stringify(user)); }, [user]);

  // 4) Gộp wishlist khách (localStorage) vào tài khoản: CHỈ GIỮ ID
  const mergeGuestWishlistToAccount = useCallback(async (acc) => {
    try {
      // localStorage.wishlist có thể là mảng ID hoặc mảng object -> ép về mảng ID
      const guest = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const guestIds = (Array.isArray(guest) ? guest : [])
        .map(x => (typeof x === "object" ? x.id : x))
        .filter(v => v !== undefined && v !== null);

      if (guestIds.length === 0) return acc;

      // acc.wishlist trong DB có thể là ID hoặc object -> cũng ép về ID
      const existingIds = new Set(
        (Array.isArray(acc.wishlist) ? acc.wishlist : [])
          .map(x => (typeof x === "object" ? x.id : x))
          .filter(v => v !== undefined && v !== null)
      );

      // hợp nhất không trùng
      guestIds.forEach(id => existingIds.add(id));
      const mergedIds = Array.from(existingIds);

      // cập nhật DB: chỉ PATCH { wishlist: [id,...] }
      const updated = await updateAccount(acc.id, { wishlist: mergedIds });

      // xoá wishlist tạm của khách sau khi đã nhập
      localStorage.removeItem("wishlist");
      return updated;
    } catch {
      return acc; // có lỗi thì thôi, vẫn cho đăng nhập
    }
  }, []);

  // 5) Đăng nhập
  const login = useCallback(async (email, password) => {
    const acc = await getAccountByEmail(email);
    if (!acc || acc.password !== password) throw new Error("Invalid email or password");

    // nhập wishlist khách vào DB rồi lấy bản acc đã cập nhật
    const mergedAcc = await mergeGuestWishlistToAccount(acc);

    // set user gọn nhẹ (không avatar)
    setUser({
      id: mergedAcc.id,
      name: mergedAcc.username || mergedAcc.name,
      email: mergedAcc.email,
      address: mergedAcc.address,
    });
  }, [mergeGuestWishlistToAccount]);

  // 6) Đăng ký
  const register = useCallback(async (data) => {
    const created = await createAccount({
      username: data.username,
      email: data.email,
      password: data.password,
      name: data.name,
      address: data.address,
      // wishlist để server tạo rỗng, không cần gửi gì thêm
    });

    // coi như đăng nhập luôn
    setUser({
      id: created.id,
      name: created.username || created.name,
      email: created.email,
      address: created.address,
    });
  }, []);

  // 7) Đăng xuất
  const logout = useCallback(() => setUser(null), []);

  // 8) Giá trị cung cấp cho toàn app
  const value = useMemo(() => ({
    user, setUser,
    login, logout, register,
    redirectAfterLogin, setRedirectAfterLogin
  }), [user, login, logout, register, redirectAfterLogin]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
