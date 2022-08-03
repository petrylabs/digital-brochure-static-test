import React, { useState } from "react";
import Image from "next/image";
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
  var logoImage;

  // !Logo
  if (
    content.fields["Hero.smScreenLogo"] !== undefined &&
    content.fields["Hero.lgScreenLogo"] !== undefined
  ) {
    logoImage = (
      <picture>
        <source
          media="(max-width: 575px)"
          srcSet={content.fields["Hero.smScreenLogo"][0]}
        />
        <source
          media="(max-width: 1023px)"
          srcSet={content.fields["Hero.lgScreenLogo"][0]}
        />
        <img
          className={styles.logoPresent}
          loading="lazy"
          src={content.fields["Hero.smScreenLogo"][0]}
          alt={content.fields["Hero.smScreenLogo"][0]}
        />
      </picture>
    );
  } else {
    logoImage = null;
  }

  // !Button
  // const isMultipleButtons = Array.isArray(content);
  // var buttonGroups;
  // if (isMultipleButtons) {
  //   buttonGroups = children.filter((child, i) => i < 3);
  // }

  return (
    <div className={styles.heroContainer}>
      <div className={styles.backgroundContainer}>
        <picture>
          {/* !Image src 
          /dA/8409150e3a/HERO-P_home@2x.jpg
          */}
          <source
            media="(max-width: 768px)"
            srcSet={content.fields["Hero.tabletImage"][0].fileAsset}
          />
          <source
            media="(max-width: 1023px)"
            srcSet={content.fields["Hero.desktopImage"][0].fileAsset}
          />
          <source
            media="(min-width: 1200px)"
            srcSet={content.fields["Hero.desktopHdImage"][0].fileAsset}
          />
          <Image
            src={content.fields["Hero.tabletImage"][0].fileAsset}
            alt="hero background img"
            layout="fill"
          />
        </picture>
      </div>

      <div
        className={`${
          logoImage ? `${styles.withImage}` : `${styles.heroContentContainer}`
        } `}
      >
        <div className={styles.content}>
          {logoImage ?? <>{logoImage}</>}
          <h1>{content.headline}</h1>
          <p>{content.copy}</p>
          {/* !Button2 
          {isMultipleButtons ? (
            buttonGroups.map((btn, i) => (
              <div className={styles.buttonGroup} key={i}>
                {btn}
              </div>
            ))
          ) : ( */}
          <div className={styles.buttonGroup} key={1}>
            <CTA type={content.buttonType} onClick={() => setIsModalOpen(true)}>
              {content.cta}
            </CTA>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <>Modal content!</>
            </Modal>
          </div>
          {/* )} */}
        </div>
      </div>
      <div className={styles.mobileImageContainer}>
        <picture>
          <source
            media="(max-width: 0px)"
            srcSet={content.fields["Hero.mobileImage"][0].fileAsset}
          />
          <Image
            alt="mobile hero image"
            src={content.fields["Hero.mobileImage"][0].fileAsset}
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
