import React from "react";
import { Container } from "react-bootstrap";

function Hero() {
  return (
    <div
      style={{
        background: "linear-gradient(120deg, #d6eaff, #f0f8ff)", // ✅ xanh pastel nhạt
        color: "#003366",
        padding: "30px 0", // ✅ nhỏ hơn
        textAlign: "center",
      }}
    >
      <Container>
        <h1
          style={{
            fontWeight: "600",
            fontSize: "2rem",
            letterSpacing: "1px",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)", // ✅ chữ nổi nhẹ
          }}
        >
          Student Management
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#335577",
            opacity: 0.8,
            marginTop: "5px",
          }}
        >
          Manage your student list effortlessly with React Hooks, providing a
          clean, intuitive interface and modern tools to keep everything
          organized and easy to follow.
        </p>
      </Container>
    </div>
  );
}

export default Hero;
