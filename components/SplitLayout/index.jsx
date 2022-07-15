import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./SplitLayout.module.scss";

/**
 * SplitLayout
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179311170/SplitLayout
 */

function SplitLayout(props) {
  const { children, contentRight = false, imageSRC } = props;

  return (
    <div className={`${styles["flex-container"]} ${contentRight ? "" : styles["content-left"]}`}>
      <div className={styles["image-column"]}>
        <div>
          <Image src={imageSRC} alt="placeholder image" width="100%" height="100%" layout="responsive" objectFit="cover" />
        </div>
      </div>
      <div className={styles["content-column"]}>
        {children}
      </div>
    </div>
  );
}

SplitLayout.propTypes = {
  /** Modal content: */
  children: PropTypes.node.isRequired,

  /** Optional Prop to set content order, defaults to false: */
  contentRight: PropTypes.bool,

  /** SRC for Image */
  imageSRC: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default SplitLayout;