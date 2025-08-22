import React from "react";
import { Carousel, Container } from "react-bootstrap";

export default function HeroCarousel({ items }) {
  const slides = items.slice(0, 6);
  return (
    <Container className="pt-4">
      <Carousel className="shadow-lg rounded-4 overflow-hidden" indicators controls>
        {slides.map((r, i) => (
          <Carousel.Item key={i} interval={3500}>
            <img src={r.image} alt={r.title} className="d-block w-100" style={{ objectFit: "cover", height: 360 }} />
            <Carousel.Caption style={{ backgroundColor: "rgba(0,0,0,.45)", borderRadius: 12, padding: 12 }}>
              <h5 className="mb-1">{r.title}</h5>
              <p className="mb-0 small">{r.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
