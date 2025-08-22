import React, { createContext, useContext, useEffect, useReducer } from "react";

const FavouritesContext = createContext();
export const useFav = () => useContext(FavouritesContext);

function reducer(state, action) {
  switch (action.type) {
    case "LOAD": return action.payload || [];
    case "TOGGLE":
      return state.find(x => x.id === action.item.id)
        ? state.filter(x => x.id !== action.item.id)
        : [...state, action.item];
    default: return state;
  }
}

export function FavouritesProvider({ children }) {
  const [favs, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: "LOAD", payload: JSON.parse(localStorage.getItem("favs") || "[]") });
  }, []);
  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favs));
  }, [favs]);

  const toggleFav = (item) => dispatch({ type: "TOGGLE", item });

  return (
    <FavouritesContext.Provider value={{ favourites: favs, toggleFav }}>
      {children}
    </FavouritesContext.Provider>
  );
}
