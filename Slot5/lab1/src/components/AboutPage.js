// src/components/AboutPage.js
import React from "react";
import { Container } from "react-bootstrap";

export default function AboutPage() {
  return (
    <div className="bg-light py-5">
      <Container>
        <h2 className="fw-bold text-success mb-4">About Healthy Recipe Finder</h2>
        <p className="text-muted" style={{ fontSize: "1.1rem" }}>
          Healthy Recipe Finder is your go-to platform for discovering quick, 
          healthy, and delicious recipes that fit your lifestyle. Whether you're 
          looking for a light breakfast, a hearty lunch, or a nutritious dinner, 
          we’ve got you covered.
        </p>
        <p className="text-muted" style={{ fontSize: "1.1rem" }}>
          You can search recipes by name or ingredient, filter by preparation 
          and cooking time, and save your favourites for easy access. 
          Our goal is to make healthy eating simple, enjoyable, and accessible to everyone.
        </p>
        <p className="text-muted" style={{ fontSize: "1.1rem" }}>
          Start exploring today and bring more healthy dishes to your table!
        </p>
      </Container>
    </div>
  );
}
