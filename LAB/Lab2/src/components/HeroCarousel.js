import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { movies } from "../movies";

const NAV_BG = "#020B1A";      // màu navbar
const ACCENT  = "#ffc107";     // vàng nhấn

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredMovies = movies.slice(0, 4); // chỉ 4 ảnh

  return (
    <div style={{ position: "relative", width: "100%", margin: "0 auto" }}>
      {/* optional: chỉnh màu icon mũi tên của bootstrap */}
      <style>{`
        .carousel-control-prev-icon, .carousel-control-next-icon { filter: invert(1); }
      `}</style>

      <Carousel
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        interval={980}
        fade
        indicators={false}
      >
        {featuredMovies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <img
              className="d-block w-100"
              src={movie.poster}
              alt={movie.title}
              style={{ height: "600px", objectFit: "cover" }}
            />

            {/* Overlay dưới cùng: đồng màu navbar */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                padding: "18px 24px",
                textAlign: "center",
                color: "#fff",
                background:
                  `linear-gradient(180deg, rgba(2,11,26,0) 0%, rgba(2,11,26,0.92) 70%, ${NAV_BG} 100%)`,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontWeight: 800,
                  color: ACCENT,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {movie.title}
              </h3>
              <p
                style={{
                  margin: "6px 0 0",
                  color: "#d6dde6",
                  maxWidth: 900,
                  display: "inline-block",
                }}
              >
                {movie.description}
              </p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Thumbnails: viền vàng khi active, nền cùng tone navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          padding: "10px 0 0",
          backgroundColor: NAV_BG,
        }}
      >
        {featuredMovies.map((movie, index) => (
          <img
            key={movie.id}
            src={movie.poster}
            alt={movie.title}
            onClick={() => setActiveIndex(index)}
            style={{
              width: 100,
              height: 60,
              objectFit: "cover",
              cursor: "pointer",
              border: index === activeIndex ? `2px solid ${ACCENT}` : "2px solid transparent",
              borderRadius: 6,
              transition: "transform .2s ease, border-color .2s ease",
              boxShadow: index === activeIndex ? "0 0 0 2px rgba(0,0,0,.2) inset" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
