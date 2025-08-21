import React from "react";
import { Carousel, Container } from "react-bootstrap";

export default function HeroCarousel({ items }) {
  const slides = items.slice(0, 6);
  return (
    <Container className="pt-4">
      <Carousel className="shadow-lg rounded-4 overflow-hidden">
        {slides.map((r, i) => (
          <Carousel.Item key={i} interval={4000}>
            <img
              src={r.image}
              alt={r.title}
              className="d-block w-100"
              style={{ objectFit: "cover", height: 360 }}
            />
            <Carousel.Caption
              style={{
                backgroundColor: "rgba(46, 125, 50, 0.8)", // xanh lá đậm
                borderRadius: "10px",
                padding: "12px",
              }}
            >
              <h5 className="mb-1" style={{ color: "#fff" }}>
                {r.title}
              </h5>
              <p className="mb-0 small" style={{ color: "#ffebee" }}>
                {r.description}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
