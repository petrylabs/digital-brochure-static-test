import React, { useContext } from "react";
import PropTypes from "prop-types";

import { breakpoints } from "../../config";
import ModalContext from "../../context/modal";
import { imageAlt, imageSrc } from "../../utils/images";
import CTA from "../CTA";
import styles from "./PageHero.module.scss";
import LanguageContext from "../../context/language";
import { getLanguageId } from "../../utils/languageVariable";

/**
 * PageHero
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179081783/PageHero
 */

function PageHero(props) {
  const { lang } = useContext(LanguageContext);
  const { content, imgContain } = props;
  const { headline, copy, buttonType, cta } = content;
  const languageId = getLanguageId(lang);

  /* Handling modal display: */
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroContentContainer}>
        <div className={styles.content}>
          <h1>{headline}</h1>
          <p>{copy}</p>
          <CTA type={buttonType} onClick={() => setIsQuoteModalOpen(true)}>
            {cta}
          </CTA>
        </div>
      </div>

      <picture className={styles.imageContainer}>
        <source
          srcSet={imageSrc(content, "desktopImage", languageId)}
          media={`(min-width: ${breakpoints.lg}px)`}
        />
        <source
          srcSet={imageSrc(content, "tabletImage", languageId)}
          media={`(min-width: ${breakpoints.md}px)`}
        />
        <source
          srcSet={imageSrc(content, "desktopHdImage", languageId)}
          media={`(min-width: ${breakpoints.blg}px)`}
        />
        <img
          src={imageSrc(content, "mobileImage", languageId)}
          alt={imageAlt(content, "mobileImage")}
          className={imgContain ? styles.contain : styles.cover}
        />
      </picture>
    </section>
  );
}

PageHero.propTypes = {
  content: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired,
    buttonType: PropTypes.string.isRequired,
    cta: PropTypes.string.isRequired,
  }).isRequired,
  imgContain: PropTypes.bool,
};

export default PageHero;
