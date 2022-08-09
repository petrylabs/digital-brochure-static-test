/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Image from "next/image";
import { imageAlt, imageSrc } from "../../utils/images";
import PropTypes from "prop-types";
import styles from "./PageHero.module.scss";
import CTA from "../CTA";
import Modal from "../Modal";
import useWindowWidth from "../../hooks/useWindowWidth";

/**
 * PageHero
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179081783/PageHero
 */

function PageHero(props) {
  const { content } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const screenWidth = useWindowWidth();

  const largeImageLoader = ({ src }) => {
    return `${imageSrc(content, src)}`;
  };

  const mobileLoader = ({ src }) => {
    return `${imageSrc(content, src)}`;
  };

  let src;
  if (screenWidth < 768) {
    // 0 - 767px
    src = "Hero.mobileImage";
  } else if (screenWidth < 1024) {
    // 768 - 1023px
    src = "Hero.tabletImage";
  } else if (screenWidth < 1200) {
    // 1024 - 1199px
    src = "Hero.desktopImage";
  } else if (screenWidth >= 1200) {
    //1200 - 1440px
    src = "Hero.desktopHdImage";
  }
  let imageTag = (
    <Image
      loader={largeImageLoader}
      src={src}
      alt={imageAlt(content, src)}
      layout="fill"
      objectFit="cover"
    />
  );

  return (
    <div className={styles.heroContainer}>
      <div className={styles.backgroundContainer}>
        {imageTag}
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
            src="Hero.mobileImage"
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
