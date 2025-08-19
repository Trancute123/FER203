import React, { useReducer } from "react";

const questions = [
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Perth"],
    answer: "Canberra",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    answer: "4",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
];

const initialState = {
  current: 0,
  score: 0,
  finished: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "ANSWER":
      const isCorrect =
        action.payload === questions[state.current].answer;
      return {
        ...state,
        score: state.score + (isCorrect ? 1 : 0),
      };
    case "NEXT":
      if (state.current + 1 < questions.length) {
        return { ...state, current: state.current + 1 };
      } else {
        return { ...state, finished: true };
      }
    case "RESTART":
      return initialState;
    default:
      return state;
  }
}

export default function Ex5Quiz() {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.finished) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h2>Your Score: {state.score} / {questions.length}</h2>
        <button
          onClick={() => dispatch({ type: "RESTART" })}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const q = questions[state.current];

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>
        Question {state.current + 1}: {q.question}
      </h2>
      <div style={{ margin: "20px 0" }}>
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => dispatch({ type: "ANSWER", payload: opt })}
            style={{
              margin: "5px",
              padding: "10px 15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              background: "#f8f9fa",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={() => dispatch({ type: "NEXT" })}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#007bff",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Next Question
      </button>
    </div>
  );
}
