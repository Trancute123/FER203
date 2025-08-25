// src/layout/HeroCarousel.js
import { Container, Carousel } from "react-bootstrap";

export default function HeroCarousel({
  slides,
  items = [],                                // 👈 data truyền từ App/Home
  take = 4,
  itemKeys = { src: "image", caption: "title", sub: "description" },
  height = 360,
  interval = 3000,
  controls = true,
  indicators = true,
  fade = false,
  rounded = "1rem",
  shadow = true,
  withContainer = true,
}) {
  let computed = Array.isArray(slides) && slides.length ? slides : [];
  if (!computed.length && Array.isArray(items) && items.length) {
    const { src, caption, sub } = itemKeys;
    computed = items.slice(0, take).map((it) => ({
      src: it?.[src],
      caption: it?.[caption],
      sub: it?.[sub],
    })).filter((s) => !!s.src);
  }
  if (!computed.length) return null;

  const inner = (
    <div className={shadow ? "shadow" : ""} style={{ borderRadius: rounded, overflow: "hidden" }}>
      <Carousel interval={interval} controls={controls} indicators={indicators} fade={fade} variant="dark">
        {computed.map((s, i) => (
          <Carousel.Item key={i}>
            <img
              src={s.src}
              alt={s.caption || `slide-${i + 1}`}
              className="d-block w-100"
              style={{ maxHeight: height, objectFit: "cover" }}
              loading="lazy"
            />
            {(s.caption || s.sub) && (
              <Carousel.Caption className="text-white" style={{
                left: 0, right: 0, bottom: 0, padding: "12px 16px",
                background: "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,0))",
              }}>
                {s.caption && <h5 className="mb-1">{s.caption}</h5>}
                {s.sub && <p className="mb-0 small">{s.sub}</p>}
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );

  return withContainer ? <Container className="py-4">{inner}</Container> : inner;
}
