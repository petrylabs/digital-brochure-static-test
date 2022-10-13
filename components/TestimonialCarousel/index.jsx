import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import useWindowWidth from "../../hooks/useWindowWidth";
import ParsedCopy from "../ParsedCopy";
import styles from "./TestimonialCarousel.module.scss";
import { getLanguageVariable } from "../../utils/languageVariable";
import LanguageContext from "../../context/language";

/**
 * TestimonialCarousel
 * Carousel widget displaying customer testimonials
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179180113/TestimonialCarousel
 */
function TestimonialCarousel(props) {
  const { lang } = useContext(LanguageContext);
  const { content } = props;
  const { headline, fields } = content;
  const slides = fields;
  const headlineId = "headline-id";

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
        {slides.map((slide, i) => {
          const province = getLanguageVariable(
            `category-${Object.keys(slide.province[0])[0]}`,
            lang
          );
          const location = slide.city
            ? `${slide.customerName}, ${slide.city}, ${province}`
            : `${slide.customerName}, ${province}`;
          return (
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
                <ParsedCopy copy={slide.testimonial} />
              </blockquote>
              <cite className={styles.cite}>{location}</cite>
            </div>
          );
        })}
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
            <span className="visually-hidden">
              {getLanguageVariable("pagination-previous", lang)}
            </span>
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
            <span className="visually-hidden">
              {getLanguageVariable("pagination-next", lang)}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

TestimonialCarousel.propTypes = {
  content: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
  }).isRequired,
};

export default TestimonialCarousel;
