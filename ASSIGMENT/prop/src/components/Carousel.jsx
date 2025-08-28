import React, { useEffect, useRef, useState } from 'react';
import './Carousel.css';
import Button from 'react-bootstrap/Button';

const Carousel = ({ products }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideInterval = useRef(null);
  const slideCount = products.length;

  useEffect(() => {
    if (!paused) {
      slideInterval.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slideCount);
      }, 3000);
    }
    return () => clearInterval(slideInterval.current);
  }, [paused, slideCount]);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Button className="carousel-control prev" onClick={goToPrev}>&lt;</Button>
      <div className="carousel-slide">
          <img
            src={products.length > 0 ? products[current].image : ''}
            className="carousel-img"
          />
          <div className="carousel-overlay">
            <div className="carousel-title">{products.length > 0 ? products[current].name : ''}</div>
            <div className="carousel-brand">{products.length > 0 ? products[current].description : ''}</div>
          </div>
      </div>
      <Button className="carousel-control next" onClick={goToNext}>&gt;</Button>
    </div>
  )
};

export default Carousel;
