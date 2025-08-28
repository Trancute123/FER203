// src/components/HeroCarousel.jsx
import { Container, Carousel } from "react-bootstrap";
import PropTypes from "prop-types";

export default function HeroCarousel({
  slides,
  items = [],
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
    computed = items
      .slice(0, take)
      .map((it) => ({
        src: it?.[src], 
        caption: it?.[caption],
        sub: it?.[sub],
      }))
      .filter((s) => !!s.src);
  }
  if (!computed.length) return null;

  const inner = (
    <div
      className={shadow ? "shadow" : ""}
      style={{ borderRadius: rounded, overflow: "hidden" }}
    >
      <Carousel
        interval={interval}
        controls={controls}
        indicators={indicators}
        fade={fade}
        variant="dark"
        pause="hover"
        aria-label="Hero Carousel"
      >
        {computed.map((s, i) => (
          <Carousel.Item key={i}>
            <img
              src={s.src}
              alt={s.caption || `slide-${i + 1}`}
              className="d-block w-100"
              style={{ maxHeight: height, objectFit: "cover" }}
              loading="lazy"
              decoding="async"
            />
            {(s.caption || s.sub) && (
              <Carousel.Caption className="hero-caption text-white">
                {s.caption && <h5 className="mb-1">{s.caption}</h5>}
                {s.sub && <p className="mb-0 small">{s.sub}</p>}
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );

  return withContainer ? (
    <Container className="py-4">{inner}</Container>
  ) : (
    inner
  );
}

HeroCarousel.propTypes = {
  slides: PropTypes.array,
  items: PropTypes.array,
  take: PropTypes.number,
  itemKeys: PropTypes.shape({
    src: PropTypes.string,
    caption: PropTypes.string,
    sub: PropTypes.string,
  }),
  height: PropTypes.number,
  interval: PropTypes.number,
  controls: PropTypes.bool,
  indicators: PropTypes.bool,
  fade: PropTypes.bool,
  rounded: PropTypes.string,
  shadow: PropTypes.bool,
  withContainer: PropTypes.bool,
};
