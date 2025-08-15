import React from "react";
import { Container } from "react-bootstrap";

export default function HeroSection() {
  return (
    <div style={{ backgroundColor: "#e6f4e6" }} className="py-5 border-bottom">
      <Container className="text-center">
        <h2 className="fw-bold text-success mb-3">
          Explore our simple, healthy recipes
        </h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Discover eight quick, whole-food dishes that fit real-life schedules
          and taste amazing. Use the search bar to find a recipe by name or
          ingredient, or simply scroll the list and let something delicious
          catch your eye.
        </p>
      </Container>
    </div>
  );
}
