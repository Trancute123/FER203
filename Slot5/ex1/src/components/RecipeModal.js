import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function RecipeModal({ show, recipe, onAddToCart, onHide }) {
  if (!recipe) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{recipe.description}</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Prep Time:</strong> {recipe.prep} mins</p>
        <p><strong>Cook Time:</strong> {recipe.cook} mins</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onAddToCart}>
          Add to Cart
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
