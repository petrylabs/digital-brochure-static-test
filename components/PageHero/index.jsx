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

  const tabletLoader = ({ src }) => {
    return `${imageSrc(content, "Hero.tabletImage")}`;
  };

  const mobileLoader = ({ src }) => {
    return `${imageSrc(content, "Hero.mobileImage")}`;
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.backgroundContainer}>
        <picture>
          <source
            media="(max-width: 1023px)"
            srcSet={imageSrc(content, "Hero.tabletImage")}
          />
          <source
            media="(mix-width: 1199px)"
            srcSet={imageSrc(content, "Hero.desktopImage")}
          />
          <source
            media="(max-width: 1440px)"
            srcSet={imageSrc(content, "Hero.desktopHdImage")}
          />
          <source
            media="(min-width: 1440px)"
            srcSet={imageSrc(content, "Hero.desktopHdImage")}
          />
          <Image
            loader={tabletLoader}
            src={imageSrc(content, "Hero.tabletImage")}
            alt={imageAlt(content, "Hero.tabletImage")}
            layout="fill"
            objectFit="cover"
            objectPosition="0px 5px"
          />
        </picture>
        <div className={styles.whiteGradient}></div>
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
          <Image
            loader={mobileLoader}
            src={imageSrc(content, "Hero.mobileImage")}
            alt={imageAlt(content, "Hero.mobileImage")}
            layout="fill"
          />
        </picture>
      </div>
    </div>
  );
}

PageHero.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PageHero;
