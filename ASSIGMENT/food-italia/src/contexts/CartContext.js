import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartCtx = createContext();   

/* ---------------- reducer quản lý state giỏ ---------------- */
function reducer(state, action){
  switch(action.type){
    case "INIT":               // khởi tạo từ localStorage
      return action.items;

    case "ADD": {             
      const p = action.product;
      const i = state.findIndex(x => x.id === p.id);
      if (i >= 0) {            // nếu đã có thì tăng số lượng
        const next = [...state];
        next[i] = { ...next[i], qty: (next[i].qty||1) + 1 };
        return next;
      }
      // nếu chưa có thì thêm mới
      return [...state, { id:p.id, title:p.title, price:(p.salePrice ?? p.price), qty:1, image:p.image }];
    }

    case "INC":   // tăng số lượng
      return state.map(x => x.id===action.id ? {...x, qty:x.qty+1} : x);

    case "DEC":   // giảm số lượng (tối thiểu 1)
      return state.map(x => x.id===action.id ? {...x, qty:Math.max(1,x.qty-1)} : x);

    case "REMOVE": // xóa 1 sản phẩm khỏi giỏ
      return state.filter(x => x.id !== action.id);

    case "CLEAR":  // xóa toàn bộ giỏ
      return [];

    default:
      return state;
  }
}

/* ---------------- Provider ---------------- */
export default function CartProvider({children}){
  const [items, dispatch] = useReducer(reducer, []);

  // load dữ liệu từ localStorage khi khởi động
  useEffect(() => {
    try {
      dispatch({type:"INIT", items: JSON.parse(localStorage.getItem("cart")||"[]")});
    } catch {}
  }, []);

  // lưu items xuống localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // tổng số lượng sản phẩm trong giỏ
  const count = useMemo(() => items.reduce((s,x)=>s+x.qty,0), [items]);

  // tổng tiền giỏ hàng
  const subtotal = useMemo(() => items.reduce((s,x)=>s+x.qty*x.price,0), [items]);

  // các action thao tác với giỏ
  const addToCart = (product)=>dispatch({type:"ADD", product});
  const incQty = (id)=>dispatch({type:"INC", id});
  const decQty = (id)=>dispatch({type:"DEC", id});
  const removeFromCart = (id)=>dispatch({type:"REMOVE", id});
  const clearCart = ()=>dispatch({type:"CLEAR"});

  return (
    <CartCtx.Provider value={{ items, count, subtotal, addToCart, incQty, decQty, removeFromCart, clearCart }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart(){ return useContext(CartCtx); }
