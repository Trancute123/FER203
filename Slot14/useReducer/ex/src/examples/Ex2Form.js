import React, { useReducer } from "react";

const initialState = { name: "", age: "" };

function reducer(state, action) {
  switch (action.type) {
    case "setName": return { ...state, name: action.payload };
    case "setAge": return { ...state, age: action.payload };
    default: return state;
  }
}

export default function Ex2Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      width: "100%",
      padding: "8px 10px",
      marginBottom: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc"
    },
    title: { fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ex2: Form</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="Name"
        value={state.name}
        onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
      />
      <input
        style={styles.input}
        type="number"
        placeholder="Age"
        value={state.age}
        onChange={(e) => dispatch({ type: "setAge", payload: e.target.value })}
      />
      <p><b>Name:</b> {state.name} | <b>Age:</b> {state.age}</p>
    </div>
  );
}
