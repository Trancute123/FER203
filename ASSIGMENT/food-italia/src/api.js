const API = "http://localhost:3001";

/* ---------- tiny fetch helper ---------- */
async function http(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error((await res.text().catch(() => "")) || `HTTP ${res.status}`);
  return res.json();
}

/* ---------- Products ---------- */
export const getProducts = () => http(`/products`);

//  robust: thử /products/:id; nếu fail, fallback /products?id=... (string/number)
export async function getProduct(id) {
  try {
    return await http(`/products/${id}`);
  } catch (e) {
    // fallback 1: query theo id dạng string
    try {
      const list = await http(`/products?id=${encodeURIComponent(id)}`);
      if (Array.isArray(list) && list.length) return list[0];
    } catch {}
    // fallback 2: query theo id dạng number
    const n = Number(id);
    if (!Number.isNaN(n)) {
      const list2 = await http(`/products?id=${n}`);
      if (Array.isArray(list2) && list2.length) return list2[0];
    }
    throw e;
  }
}

/* ---------- Accounts (tối giản) ---------- */
export async function getAccountByEmail(email) {
  const list = await http(`/accounts?email=${encodeURIComponent(email)}`);
  return Array.isArray(list) && list.length ? list[0] : null;
}
export const getAccountById = (id) => http(`/accounts/${id}`);

export function createAccount(data) {
  const payload = {
    username: data.username,
    email: data.email,
    password: data.password,
    name: data.name || data.username || "",
    address: data.address || { country: "Vietnam", city: "", street: "" },
    wishlist: [],
  };
  return http(`/accounts`, { method: "POST", body: JSON.stringify(payload) });
}

export function updateAccount(id, data) {
  const { avatar, ...safe } = data || {};
  return http(`/accounts/${id}`, { method: "PATCH", body: JSON.stringify(safe) });
}

/* ---------- Wishlist: CHỈ GỬI ID ---------- */
export async function saveWishlist(userId, itemsOrIds = []) {
  const ids = (Array.isArray(itemsOrIds) ? itemsOrIds : [])
    .map((x) => (typeof x === "object" ? x.id : x))
    .filter((v) => v !== undefined && v !== null);
  return updateAccount(userId, { wishlist: ids });
}

// ---------- Orders ----------
export async function createOrder({ userid, items, total }) {
  const raw = Array.isArray(items) ? items : [];

  // Chuẩn hoá mỗi item: nếu là ID thì lookup product để lấy title + price
  const lineItems = await Promise.all(
    raw.map(async (p) => {
      if (p && typeof p === "object") {
        return {
          id: p.id,
          title: p.title ?? p.name ?? (p.id != null ? `#${p.id}` : "Unknown"),
          qty: p.qty ?? 1,
          unitPrice: Number(p.salePrice ?? p.price ?? 0),
        };
      }
      // p là ID (số/chuỗi) -> lấy product
      try {
        const prod = await getProduct(p);
        return {
          id: prod?.id ?? p,
          title: prod?.title ?? prod?.name ?? `#${p}`,
          qty: 1,
          unitPrice: Number(prod?.salePrice ?? prod?.price ?? 0),
        };
      } catch {
        return { id: p, title: `#${p}`, qty: 1, unitPrice: 0 };
      }
    })
  );

  const safeTotal =
    total ?? lineItems.reduce((s, it) => s + (it.unitPrice || 0) * (it.qty || 1), 0);

  const payload = {
    userid,
    items: lineItems,
    total: Number(safeTotal.toFixed(2)),
    date: new Date().toISOString(),
  };

  return http(`/orders`, { method: "POST", body: JSON.stringify(payload) });
}


export const getOrdersByUser = (userid) =>
  http(`/orders?userid=${encodeURIComponent(userid)}`);
