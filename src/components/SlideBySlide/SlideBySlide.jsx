import "./slidebyslide.css";

import { useEffect, useRef } from "react";

import getImage from "../../utils/getImage";

const SlideCarousel = ({ characters }) => {
  const cardsRef = useRef([]);
  const indexRef = useRef(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % 6;

      const card = cardsRef.current[indexRef.current];
      const carousel = carouselRef.current;

      carousel.scrollTo({
        left: card.offsetLeft,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [12]);

  return (
    <div className="hero-slide-carousel" ref={carouselRef}>
      <div className="characters-slide-group">
        <div
          className="slide-picture-card"
          ref={(el) => (cardsRef.current[0] = el)}
        >
          <img
            src={getImage(characters[0].thumbnail)}
            alt={characters[0].name}
            className="hero-slide-image"
          />
        </div>
        <div
          className="slide-picture-card"
          ref={(el) => (cardsRef.current[1] = el)}
        >
          <img
            src={getImage(characters[4].thumbnail)}
            alt={characters[4].name}
            className="hero-slide-image"
          />
        </div>
        <div
          className="slide-picture-card"
          ref={(el) => (cardsRef.current[2] = el)}
        >
          <img
            src={getImage(characters[7].thumbnail)}
            alt={characters[7].name}
            className="hero-slide-image"
          />
        </div>
        <div
          className="slide-picture-card"
          ref={(el) => (cardsRef.current[3] = el)}
        >
          <img
            src={getImage(characters[30].thumbnail)}
            alt={characters[30].name}
            className="hero-slide-image"
          />
        </div>
        <div
          className="slide-picture-card"
          ref={(el) => (cardsRef.current[4] = el)}
        >
          <img
            src={getImage(characters[12].thumbnail)}
            alt={characters[12].name}
            className="hero-slide-image"
          />
        </div>
        <div
          className="slide-picture-card"
          ref={(el) => (cardsRef.current[5] = el)}
        >
          <img
            src={getImage(characters[33].thumbnail)}
            alt={characters[33].name}
            className="hero-slide-image"
          />
        </div>
      </div>
    </div>
  );
};

export default SlideCarousel;
