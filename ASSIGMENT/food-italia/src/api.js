const API = (import.meta?.env?.VITE_API_URL) || "http://localhost:3001";

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

/* Products */
export const getProducts = () => http(`/products`);
export const getProduct = (id) => http(`/products/${id}`);

/* Accounts */
export const getAccountByEmail = async (email) => {
  const list = await http(`/accounts?email=${encodeURIComponent(email)}`);
  return Array.isArray(list) && list.length ? list[0] : null;
};
export const getAccountById = (id) => http(`/accounts/${id}`);
export const createAccount = (data) =>
  http(`/accounts`, {
    method: "POST",
    body: JSON.stringify({
      name: data.name || "",
      email: data.email,
      username: data.username,
      password: data.password,
      avatar: data.avatar || "",
      secretQuestion: data.secretQuestion || data.question || "",
      answer: data.answer || "",
      address: data.address || { country: "Vietnam", city: "", street: "" },
      wishlist: data.wishlist || [],
    }),
  });
export const updateAccount = (id, data) =>
  http(`/accounts/${id}`, { method: "PATCH", body: JSON.stringify(data) });

/* Orders */
export const createOrder = ({ userId, items, total }) =>
  http(`/orders`, { method: "POST", body: JSON.stringify({ userId, items, total, date: new Date().toISOString() }) });

export const getOrdersByUser = (userId) =>
  http(`/orders?userId=${encodeURIComponent(userId)}`);
