/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Image from "next/image";
import { imageAlt, imageSrc } from "../../utils/images";
import PropTypes from "prop-types";
import styles from "./PageHero.module.scss";
import CTA from "../CTA";
import Modal from "../Modal";

/**
 * PageHero
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179081783/PageHero
 */

function PageHero(props) {
  const { content } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabletImageProps = {
    src: imageSrc(content, "Hero.tabletImage"),
    alt: imageAlt(content, "Hero.tabletImage"),
    layout: "fill",
    objectFit: "cover",
  };

  const mobileImageProps = {
    src: imageSrc(content, "Hero.mobileImage"),
    alt: imageAlt(content, "Hero.mobileImage"),
    layout: "fill",
    objectFit: "cover",
  };

  console.log(imageSrc(content, "Hero.desktopHdImage"));

  return (
    <div className={styles.heroContainer}>
      <div className={styles.backgroundContainer}>
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={imageSrc(content, "Hero.tabletImage")}
          />
          <source
            media="(max-width: 1023px)"
            srcSet={imageSrc(content, "Hero.desktopImage")}
          />
          <source
            media="(min-width: 1200px)"
            srcSet={imageSrc(content, "Hero.desktopHdImage")}
          />
          <Image {...tabletImageProps} />
        </picture>
      </div>

      <div className={styles.heroContentContainer}>
        <div className={styles.content}>
          <h1>{content.headline}</h1>
          <p>{content.copy}</p>
          <div className={styles.buttonGroup} key={1}>
            <CTA type={content.buttonType} onClick={() => setIsModalOpen(true)}>
              {content.cta}
            </CTA>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <>Modal content!</>
            </Modal>
          </div>
        </div>
      </div>
      <div className={styles.mobileImageContainer}>
        <picture>
          <source
            media="(max-width: 0px)"
            srcSet={imageSrc(content, "Hero.mobileImage")}
          />
          <Image {...mobileImageProps} />
        </picture>
      </div>
    </div>
  );
}

PageHero.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PageHero;
