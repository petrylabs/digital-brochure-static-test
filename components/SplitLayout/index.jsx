import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import parse from "html-react-parser";

import { customLoader, imageAlt, imageSrc } from "../../utils/images";
import LargeScreenImage from "../LargeScreenImage";
import styles from "./SplitLayout.module.scss";

/**
 * SplitLayout
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179311170/SplitLayout
 */

function SplitLayout(props) {
  const { content, hideImageOnMobile, imageRight } = props;
  const imageString = content.fields.hasOwnProperty("GenericContent.image")
    ? "GenericContent.image"
    : "Feature.featureImage";

  const imageProps = {
    loader: customLoader,
    src: imageSrc(content, imageString),
    alt: imageAlt(content, imageString),
    layout: "fill",
    objectFit: "cover",
  };

  return (
    <div
      className={`${styles.flexContainer} ${imageRight ? styles.imageRight : ""
        }`}
    >
      {/* IMAGE */}
      <div
        className={`${styles.imageCol} ${hideImageOnMobile && styles.hideImage
          }`}
      >
        {hideImageOnMobile ? (
          <LargeScreenImage {...imageProps} />
        ) : (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image {...imageProps} />
        )}
      </div>

      {/* TEXT CONTENT */}
      <div className={styles.contentCol}>
        <h2>{content.headline}</h2>
        <div className={styles.content}>{parse(content.copy)}</div>
        {content?.cta && (
          <div className={styles.ctaLinkWrapper}>
            <a href={content.url} className={styles.ctaLink}>
              {content.cta}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

SplitLayout.propTypes = {
  /** Content object: */
  content: PropTypes.shape({
    headline: PropTypes.string,
    copy: PropTypes.string,
    fields: PropTypes.shape({
      "GenericContent.image": PropTypes.array,
    }),
  }).isRequired,

  /** Only show image on large screen */
  hideImageOnMobile: PropTypes.bool,

  /** Optional Prop to set content order */
  imageRight: PropTypes.bool,
};

SplitLayout.defaultProps = {
  hideImageOnMobile: false,
  imageRight: false,
};

export default SplitLayout;
