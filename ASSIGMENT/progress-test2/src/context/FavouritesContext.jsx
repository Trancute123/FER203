import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const FavCtx = createContext(null);

export function FavouritesProvider({ children }) {
  const [idsArr, setIdsArr] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favourites") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(idsArr));
  }, [idsArr]);

  const toggle = useCallback((id) => {
    setIdsArr(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  }, []);

  const clear = useCallback(() => setIdsArr([]), []);

  const value = useMemo(() => ({
    ids: new Set(idsArr),   // tiện cho .has()
    idsArr,
    count: idsArr.length,
    toggle,
    clear,
  }), [idsArr, toggle, clear]);

  return <FavCtx.Provider value={value}>{children}</FavCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavourites() {
  const ctx = useContext(FavCtx);
  if (!ctx) throw new Error("useFavourites must be used within FavouritesProvider");
  return ctx;
}

