// src/api.js
const API = "http://localhost:3001";

/* ========== helpers ========== */
async function http(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

/* ========== Products ========== */
export async function getProducts() {
  return http(`/products`);
}

export async function getProduct(id) {
  return http(`/products/${id}`);
}

/* ========== Accounts ========== */
// GET /accounts?email=... -> trả về account đầu tiên hoặc null
export async function getAccountByEmail(email) {
  const list = await http(`/accounts?email=${encodeURIComponent(email)}`);
  return Array.isArray(list) && list.length ? list[0] : null;
}

export async function getAccountById(id) {
  return http(`/accounts/${id}`);
}

// Tạo account mới (json-server tự tăng id)
export async function createAccount(data) {
  // bảo đảm có các field cần thiết
  const payload = {
    name: data.name || "",
    email: data.email,
    username: data.username,
    password: data.password,
    avatar: data.avatar || "",
    secretQuestion: data.secretQuestion || data.question || "",
    answer: data.answer || "",
    address: data.address || { country: "Vietnam", city: "", street: "" },
    wishlist: data.wishlist || [],
  };
  return http(`/accounts`, { method: "POST", body: JSON.stringify(payload) });
}

// Cập nhật 1 phần
export async function updateAccount(id, data) {
  return http(`/accounts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/* ========== Orders ========== */
export async function createOrder({ userId, items, total }) {
  const payload = {
    userId,
    items,
    total,
    date: new Date().toISOString(),
  };
  return http(`/orders`, { method: "POST", body: JSON.stringify(payload) });
}

export async function getOrdersByUser(userId) {
  return http(`/orders?userId=${encodeURIComponent(userId)}`);
}
