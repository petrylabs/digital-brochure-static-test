import React from "react";
import PropTypes from "prop-types";
import styles from "./PageHero.module.scss";

/**
 * PageHero
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179081783/PageHero
 */

function PageHero(props) {
  const { children, mainText, subText, properties } = props;
  const imageData = JSON.parse(properties);
  var logoImage;
  if (imageData.extra_small.logoUrl || imageData.large.logoUrl) {
    logoImage = (
      <picture>
        <source
          media="(max-width: 575px)"
          srcSet={imageData.extra_small.logoUrl}
        />
        <source media="(max-width: 1023px)" srcSet={imageData.large.logoUrl} />
        <img
          className="logo-image"
          loading="lazy"
          src={imageData.extra_small.logoUrl}
          alt={imageData.extra_small.logoAltText}
        />
      </picture>
    );
  } else {
    logoImage = null;
  }

  const isMultipleButtons = Array.isArray(children);
  var buttonGroups;
  console.log(children);
  console.log(isMultipleButtons);
  if (isMultipleButtons) {
    buttonGroups = children.filter((child, i) => i < 3);
  }

  return (
    <div className={styles.heroContainer}>
      <div className={styles.backgroundContainer}>
        <picture>
          <source
            media="(max-width: 575px)"
            srcSet={imageData.extra_small.styles.backgroundImage}
          />
          <source
            media="(max-width: 767px)"
            srcSet={imageData.small.styles.backgroundImage}
          />
          <source
            media="(max-width: 1023px)"
            srcSet={imageData.medium.styles.backgroundImage}
          />
          <source
            media="(max-width: 1439px)"
            srcSet={imageData.large.styles.backgroundImage}
          />
          <source
            media="(min-width: 1440px)"
            srcSet={imageData.extra_large.styles.backgroundImage}
          />
          <img
            src={imageData.medium.styles.backgroundImage}
            alt="hero background img"
          />
        </picture>
      </div>

      <div className={styles.heroContentContainer}>
        <div className={styles.content}>
          <h1>{mainText}</h1>
          <p>{subText}</p>
          {isMultipleButtons ? (
            buttonGroups.map((btn, i) => (
              <div className={styles.buttonGroup} key={i}>
                {btn}
              </div>
            ))
          ) : (
            <div className={styles.buttonGroup} key={1}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

PageHero.propTypes = {
  children: PropTypes.node,
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  properties: PropTypes.string,
};

export default PageHero;
