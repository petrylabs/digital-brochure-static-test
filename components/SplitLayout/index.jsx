import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import parse from "html-react-parser";

import { imageAlt, imageSrc } from "../../utils/images";
import styles from "./SplitLayout.module.scss";

/**
 * SplitLayout
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179311170/SplitLayout
 */

function SplitLayout(props) {
  const { content, imageRight } = props;

  return (
    <div
      className={`${styles.flexContainer} ${
        imageRight ? styles.imageRight : ""
      }`}
    >
      {/* IMAGE */}
      <div className={styles.imageCol}>
        {/* /_next/image?url=https%3A%2F%2Fwww.sonnet.ca%2FdA%2Fa4b641da-cf75-4cd2-84f7-80a652ce8534%2FAUTO_couple_driving_on_the_road%25401x.jpg&w=3840&q=75 */}
        <Image
          src={imageSrc(content, "GenericContent.image")}
          alt={imageAlt(content, "GenericContent.image")}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* TEXT CONTENT */}
      <div className={styles.contentCol}>
        <h2>{content.headline}</h2>
        {parse(content.copy)}
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
      "GenericContent.image": PropTypes.object,
    }),
  }).isRequired,

  /** Optional Prop to set content order */
  imageRight: PropTypes.bool,
};

SplitLayout.defaultProps = {
  imageRight: false,
};

export default SplitLayout;
