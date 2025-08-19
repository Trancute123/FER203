import React, { useReducer, useState } from "react";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "add": return [...state, action.payload];
    default: return state;
  }
}

export default function Ex3ItemList() {
  const [items, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");

  const styles = {
    container: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      margin: "20px auto",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      maxWidth: "400px",
      textAlign: "center"
    },
    input: {
      width: "70%",
      padding: "8px",
      marginRight: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc"
    },
    button: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "6px",
      background: "#007bff",
      color: "#fff",
      cursor: "pointer"
    },
    list: {
      marginTop: "15px",
      textAlign: "left",
      padding: "0",
      listStyle: "none"
    },
    item: { padding: "6px 0", borderBottom: "1px solid #ddd" }
  };

  return (
    <div style={styles.container}>
      <h2>Ex3: Item List</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter item"
        value={input}
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
        Add
      </button>
      <ul style={styles.list}>
        {items.map((item, i) => (
          <li key={i} style={styles.item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
