import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartCtx = createContext();

function reducer(state, action){
  switch(action.type){
    case "INIT": return action.items;
    case "ADD": {
      const p = action.product;
      const i = state.findIndex(x => x.id === p.id);
      if (i >= 0) {
        const next = [...state];
        next[i] = { ...next[i], qty: (next[i].qty||1) + 1 };
        return next;
      }
      return [...state, { id:p.id, title:p.title, price:(p.salePrice ?? p.price), qty:1, image:p.image }];
    }
    case "INC": return state.map(x => x.id===action.id ? {...x, qty:x.qty+1} : x);
    case "DEC": return state.map(x => x.id===action.id ? {...x, qty:Math.max(1,x.qty-1)} : x);
    case "REMOVE": return state.filter(x => x.id !== action.id);
    case "CLEAR": return [];
    default: return state;
  }
}

export default function CartProvider({children}){
  const [items, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    try { dispatch({type:"INIT", items: JSON.parse(localStorage.getItem("cart")||"[]")}); } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("cart", JSON.stringify(items)); }, [items]);

  const count = useMemo(() => items.reduce((s,x)=>s+x.qty,0), [items]);
  const subtotal = useMemo(() => items.reduce((s,x)=>s+x.qty*x.price,0), [items]);

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
