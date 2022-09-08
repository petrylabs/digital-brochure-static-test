import React, { useContext } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import { breakpoints } from "../../config";
import ModalContext from "../../context/modal";
import useWindowWidth from "../../hooks/useWindowWidth";
import { customLoader, imageAlt, imageSrc } from "../../utils/images";
import CTA from "../CTA";
import styles from "./PageHero.module.scss";

/**
 * PageHero
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179081783/PageHero
 */

function PageHero(props) {
  const { content } = props;

  const imageLoader = ({ src }) => {
    return imageSrc(content, src);
  };

  const screenWidth = useWindowWidth();
  let src;
  if (screenWidth < breakpoints.lg) {
    src = "Hero.tabletImage";
  } else if (screenWidth < 1200) {
    src = "Hero.desktopImage";
  } else if (screenWidth >= 1200) {
    src = "Hero.desktopHdImage";
  }

  /* Handling modal display: */
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  return (
    <section className={styles.heroContainer}>
      {screenWidth >= breakpoints.md && (
        <div className={styles.backgroundContainer}>
          <Image
            loader={imageLoader}
            src={src}
            alt={imageAlt(content, src)}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className={styles.whiteGradient} />
        </div>
      )}

      <div className={styles.heroContentContainer}>
        <div className={styles.content}>
          <h1>{content.headline}</h1>
          <p>{content.copy}</p>
          <div className={styles.buttonGroup}>
            <CTA
              type={content.buttonType}
              onClick={() => setIsQuoteModalOpen(true)}
            >
              {content.cta}
            </CTA>
          </div>
        </div>
      </div>

      {screenWidth < breakpoints.md && (
        <div className={styles.mobileImageContainer}>
          <Image
            loader={customLoader}
            src={imageSrc(content, "Hero.mobileImage")}
            alt={imageAlt(content, "Hero.mobileImage")}
            layout="fill"
            priority
          />
        </div>
      )}
    </section>
  );
}

PageHero.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PageHero;
