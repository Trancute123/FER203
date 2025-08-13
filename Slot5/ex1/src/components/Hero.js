import React from "react";
import { Container } from "react-bootstrap";

export default function Hero() {
  return (
    <Container className="text-center pt-4 pb-3">
      <h2 className="fw-bold display-6">Explore our simple, healthy recipes</h2>
      <p className="text-muted mb-0">
        Discover quick, whole-food dishes that fit real-life schedules and taste amazing.
        Use the search bar to find a recipe by name or ingredient, or simply scroll the list.
      </p>
    </Container>
  );
}
