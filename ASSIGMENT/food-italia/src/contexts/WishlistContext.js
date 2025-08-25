import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const WLCtx = createContext();
function reducer(state, action){
  switch(action.type){
    case "INIT": return action.items;
    case "TOGGLE":
      return state.some(x=>x.id===action.product.id)
        ? state.filter(x=>x.id!==action.product.id)
        : [...state, action.product];
    default: return state;
  }
}
export default function WishlistProvider({children}){
  const [items, dispatch] = useReducer(reducer, []);
  useEffect(()=>{ try{ dispatch({type:"INIT", items: JSON.parse(localStorage.getItem("wishlist")||"[]")}); }catch{} },[]);
  useEffect(()=>{ localStorage.setItem("wishlist", JSON.stringify(items)); },[items]);
  const ids = useMemo(()=> new Set(items.map(x=>x.id)), [items]);
  const toggle = (product)=>dispatch({type:"TOGGLE", product});
  return <WLCtx.Provider value={{items, ids, toggle}}>{children}</WLCtx.Provider>;
}
export function useWishlist(){ return useContext(WLCtx); }
