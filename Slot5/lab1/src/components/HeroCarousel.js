import React from "react";
import { Carousel, Container } from "react-bootstrap";

export default function HeroCarousel({ items }) {
  const slides = items.slice(0, 3);
  return (
    <Container className="pt-4">
      <Carousel className="shadow-sm rounded-4 overflow-hidden">
        {slides.map((r, i) => (
          <Carousel.Item key={i} interval={4000}>
            <img
              src={r.image}
              alt={r.title}
              className="d-block w-100"
              style={{ objectFit: "cover", height: 360 }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded-3 p-2">
              <h5 className="mb-1">{r.title}</h5>
              <p className="mb-0 small">{r.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
