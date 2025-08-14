import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const StudentCard = ({ student, onEdit }) => {
  const { name, age, avatar } = student;
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="mb-4 h-100 d-flex flex-column"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "20rem",
        border: "none",
        borderRadius: 20,
        transition: "all .2s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 25px rgba(0,0,0,0.15)"
          : "0 6px 15px rgba(0,0,0,0.08)",
        background: "linear-gradient(135deg, #fdfcfb, #e2d1c3)",
      }}
    >
      <Card.Img
        variant="top"
        src={avatar}
        alt={`${name}'s avatar`}
        style={{
          height: 220,
          objectFit: "cover",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <Card.Body
        className="d-flex flex-column"
        style={{
          padding: "18px 20px",
          background: hovered
            ? "linear-gradient(135deg, #ffecd2, #fcb69f)"
            : "linear-gradient(135deg, #fff, #f9f9f9)",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Card.Title
          className="mb-1"
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: hovered ? "#d35400" : "#333",
          }}
        >
          {name}
        </Card.Title>
        <Card.Text
          style={{
            color: hovered ? "#6e2c00" : "#555",
            marginBottom: 14,
          }}
        >
          Age: {age}
        </Card.Text>
        <Button
          size="sm"
          onClick={onEdit} // gọi hàm từ App.js
          style={{
            backgroundColor: hovered ? "#e67e22" : "#f39c12",
            border: "none",
            color: "white",
            fontWeight: "500",
            padding: "6px 14px",
            borderRadius: 6,
          }}
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
