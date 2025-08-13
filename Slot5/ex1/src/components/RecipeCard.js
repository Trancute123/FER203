import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaUsers, FaClock } from "react-icons/fa";

export default function RecipeCard({ recipe, onView }) {
  return (
    <Card className="h-100 shadow-sm border-0 rounded-4"
      style={{ transition: "transform 0.2s" }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <Card.Img
        variant="top"
        src={recipe.image}
        alt={recipe.title}
        style={{ objectFit: "cover", height: 250 }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-5 fw-bold text-success">{recipe.title}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">{recipe.description}</Card.Text>
        <div className="d-flex justify-content-between text-success mb-3 small">
          <div><FaUsers className="me-1" /> {recipe.servings}</div>
          <div><FaClock className="me-1" /> Prep: {recipe.prep}m</div>
          <div><FaClock className="me-1" /> Cook: {recipe.cook}m</div>
        </div>
        <Button variant="success" className="w-100 fw-semibold" onClick={() => onView(recipe)}>
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
}
