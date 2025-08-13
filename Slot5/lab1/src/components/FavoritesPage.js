import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

export default function FavoritesPage({ items = [], onViewRecipe }) {
  return (
    <Container className="my-4">
      <h2 className="mb-4 text-success fw-bold">❤️ Your Favourite Recipes</h2>

      {items.length === 0 ? (
        <Alert variant="info">You have no favourite recipes yet!</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {items.map((recipe, idx) => (
            <Col key={idx}>
              <RecipeCard
                recipe={recipe}
                onView={onViewRecipe}
                showAddToFav={false} // Ẩn nút Add to Favourite
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
