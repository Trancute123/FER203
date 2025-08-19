import React, { useReducer } from "react";

const initialState = 0;

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
}

export default function Ex1Counter() {
  const [count, dispatch] = useReducer(reducer, initialState);

  const styles = {
    container: {
      background: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      maxWidth: "400px",
      margin: "20px auto",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    },
    counter: { fontSize: "28px", fontWeight: "bold", marginBottom: "15px" },
    button: {
      padding: "8px 14px",
      border: "none",
      borderRadius: "6px",
      margin: "5px",
      cursor: "pointer",
      fontSize: "16px"
    },
    plus: { background: "#007bff", color: "#fff" },
    minus: { background: "#dc3545", color: "#fff" },
    reset: { background: "#6c757d", color: "#fff" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.counter}>Counter: {count}</div>
      <button style={{ ...styles.button, ...styles.plus }} onClick={() => dispatch({ type: "increment" })}>+</button>
      <button style={{ ...styles.button, ...styles.minus }} onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button style={{ ...styles.button, ...styles.reset }} onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
