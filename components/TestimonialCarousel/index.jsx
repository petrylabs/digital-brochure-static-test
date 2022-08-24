import React, { useState } from "react";

import useWindowWidth from "../../hooks/useWindowWidth";
import Chevron from "../../icons/Chevron";
import styles from "./TestimonialCarousel.module.scss";

/**
 * TestimonialCarousel
 * Carousel widget displaying customer testimonials
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179180113/TestimonialCarousel
 */
function TestimonialCarousel(props) {
  const { content } = props;
  const { headline } = content;
  const headlineId = "headline-id";
  const slides = [1, 2];

  /* Handle slides: */
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const lastSlideIndex = slides.length - 1;
  const handleNext = () => {
    const newActiveSlide =
      activeSlideIndex === lastSlideIndex ? 0 : activeSlideIndex + 1;
    setActiveSlideIndex(newActiveSlide);
  };
  const handlePrev = () => {
    const newActiveSlide =
      activeSlideIndex === 0 ? lastSlideIndex : activeSlideIndex - 1;
    setActiveSlideIndex(newActiveSlide);
  };

  /* Handle screen size: */
  const screenSize = useWindowWidth();
  const showPrevNext = screenSize > 480; // magic number; doesn't match any breakpoint

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-labelledby={headlineId}
    >
      <h2 id={headlineId}>{headline}</h2>

      {/* SLIDES: */}
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

      {/* SLIDE CONTROLS: */}
      <div
        className={`${styles.controls} ${
          showPrevNext ? styles.controlsRight : ""
        }`}
      >
        {showPrevNext && (
          <button
            type="button"
            onClick={() => handlePrev()}
            className={`${styles.prevnext} ${styles.prev}`}
          >
            {/* TODO: translate */}
            <span className="visually-hidden">Previous</span>
          </button>
        )}

        <div className={styles.dots}>
          {slides.map((slide, i) => (
            <button
              key={`k${i}`}
              type="button"
              onClick={() => setActiveSlideIndex(i)}
              className={`${styles.dot} ${
                activeSlideIndex === i ? styles.active : ""
              }`}
            >
              {/* TODO: translate */}
              <span className="visually-hidden">Slide {i + 1}</span>
            </button>
          ))}
        </div>

        {showPrevNext && (
          <button
            type="button"
            onClick={() => handleNext()}
            className={`${styles.prevnext} ${styles.next}`}
          >
            {/* TODO: translate */}
            <span className="visually-hidden">Next</span>
          </button>
        )}
      </div>
    </section>
  );
}

export default TestimonialCarousel;
