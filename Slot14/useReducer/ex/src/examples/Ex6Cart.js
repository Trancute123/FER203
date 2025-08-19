// src/examples/Ex6Cart.js
import React, { useReducer } from "react";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), name: action.payload, qty: 1 }];
    case "increase":
      return state.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
      );
    case "decrease":
      return state.map((item) =>
        item.id === action.payload && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );
    case "remove":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

export default function Ex6Cart() {
  const [cart, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = React.useState("");

  const styles = {
    container: {
      background: "#f9f9f9",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      maxWidth: "600px"
    },
    input: {
      marginRight: "10px",
      padding: "6px 10px",
      borderRadius: "4px",
      border: "1px solid #ccc"
    },
    button: {
      padding: "6px 12px",
      border: "none",
      borderRadius: "4px",
      background: "#28a745",
      color: "#fff",
      cursor: "pointer",
      marginLeft: "5px"
    },
    list: {
      marginTop: "10px",
      paddingLeft: "20px"
    }
  };

  return (
    <div style={styles.container}>
      <h2>Ex6: Shopping Cart</h2>
      <input
        style={styles.input}
        type="text"
        value={input}
        placeholder="Product name"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        style={styles.button}
        onClick={() => {
          if (input.trim()) {
            dispatch({ type: "add", payload: input });
            setInput("");
          }
        }}
      >
        Add Product
      </button>
      <ul style={styles.list}>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Qty: {item.qty}
            <button
              style={styles.button}
              onClick={() => dispatch({ type: "increase", payload: item.id })}
            >
              +
            </button>
            <button
              style={styles.button}
              onClick={() => dispatch({ type: "decrease", payload: item.id })}
            >
              -
            </button>
            <button
              style={styles.button}
              onClick={() => dispatch({ type: "remove", payload: item.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
