import React, { useState } from "react";

import styles from "./TestimonialCarousel.module.scss";

/**
 * TestimonialCarousel
 * Carousel widget displaying customer testimonials
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179180113/TestimonialCarousel
 */
function TestimonialCarousel(props) {
  const { content } = props;
  const { headline } = content?.fields;
  const headlineId = "headline-id";
  const slides = [1, 2];

  /* Handle slides: */
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const handleNext = () => {
    setActiveSlideIndex((prevActiveSlide) => prevActiveSlide + 1);
  };
  const handleBack = () => {
    setActiveSlideIndex((prevActiveSlide) => prevActiveSlide - 1);
  };

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-labelledby={headlineId}
    >
      <h2 id={headlineId}>{headline}</h2>

      {/* Slides: */}
      <div className={styles.slides}>
        {slides.map((slide, i) => (
          <div
            key={`k${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
            aria-hidden={activeSlideIndex !== i}
            className={`${styles.slide} ${
              activeSlideIndex === i ? styles.active : ""
            }`}
          >
            <blockquote className={styles.quote}>
              This is a quote about my wonderful car insurance!
              {i === 0 && <div>here is some extra text</div>}
            </blockquote>
            <cite className={styles.cite}>Bob the Builder, Tilting, NL</cite>
          </div>
        ))}
      </div>

      {/* Slide controls: */}
      <div className={styles.controls}>
        {slides.map((slide, i) => (
          <button
            key={`k${i}`}
            type="button"
            onClick={() => setActiveSlideIndex(i)}
          >
            {/* TODO: translate */}
            <span className="visually-hidden">Slide {i + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TestimonialCarousel;
