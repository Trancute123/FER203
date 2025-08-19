import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap"; // Layout và Alert của Bootstrap
import RecipeCard from "./RecipeCard"; // Component hiển thị món ăn dạng thẻ

export default function FavoritesPage({ items = [], onViewRecipe }) {
  return (
    <Container className="my-4">
      {/* Tiêu đề */}
      <h2 className="mb-4 text-success fw-bold">❤️ Your Favourite Recipes</h2>

      {/* Nếu chưa có món yêu thích */}
      {items.length === 0 ? (
        <Alert variant="info">You have no favourite recipes yet!</Alert>
      ) : (
        // Nếu có món thì hiển thị dạng lưới
        <Row xs={1} md={2} lg={3} className="g-4">
          {items.map((recipe, idx) => (
            <Col key={idx}>
              <RecipeCard
                recipe={recipe}
                onView={onViewRecipe}
                showAddToFav={false} // Ẩn nút "Add to Favourite"
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
