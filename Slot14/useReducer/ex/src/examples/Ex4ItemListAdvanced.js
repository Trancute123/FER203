import React, { useReducer, useState } from "react";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "add": return [...state, { text: action.payload, id: Date.now(), createdAt: Date.now() }];
    case "remove": return state.filter((item) => item.id !== action.payload);
    case "edit": return state.map((item) => item.id === action.payload.id ? { ...item, text: action.payload.text } : item);
    default: return state;
  }
}

export default function Ex4ItemListAdvanced() {
  const [items, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const styles = {
    container: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      margin: "20px auto",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      maxWidth: "500px",
      fontFamily: "Arial, sans-serif"
    },
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      marginBottom: "10px"
    },
    button: {
      padding: "6px 12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      margin: "2px"
    },
    addBtn: { background: "#007bff", color: "#fff" },
    removeBtn: { background: "#dc3545", color: "#fff" },
    editBtn: { background: "#ffc107", color: "#000" },
    saveBtn: { background: "#28a745", color: "#fff" },
    cancelBtn: { background: "#6c757d", color: "#fff" },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px",
      borderBottom: "1px solid #eee"
    },
    select: {
      padding: "6px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      marginBottom: "10px"
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.text.localeCompare(b.text);
    if (sortBy === "time") return a.createdAt - b.createdAt;
    return 0;
  });

  return (
    <div style={styles.container}>
      <h2>Ex4: Advanced Item List</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter item name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        style={{ ...styles.button, ...styles.addBtn }}
        onClick={() => {
          if (input.trim()) {
            dispatch({ type: "add", payload: input });
            setInput("");
          }
        }}
      >
        Add Item
      </button>

      <select style={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="time">Sort by Created Time</option>
      </select>

      {sortedItems.map((item) => (
        <div key={item.id} style={styles.row}>
          {editingId === item.id ? (
            <>
              <input style={styles.input} value={editText} onChange={(e) => setEditText(e.target.value)} />
              <button
                style={{ ...styles.button, ...styles.saveBtn }}
                onClick={() => {
                  dispatch({ type: "edit", payload: { id: item.id, text: editText } });
                  setEditingId(null);
                }}
              >
                Save
              </button>
              <button style={{ ...styles.button, ...styles.cancelBtn }} onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{item.text}</span>
              <div>
                <button
                  style={{ ...styles.button, ...styles.editBtn }}
                  onClick={() => {
                    setEditingId(item.id);
                    setEditText(item.text);
                  }}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.button, ...styles.removeBtn }}
                  onClick={() => dispatch({ type: "remove", payload: item.id })}
                >
                  Remove
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
