import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import { breakpoints } from "../../config";
import useWindowWidth from "../../hooks/useWindowWidth";
import { customLoader, imageAlt, imageSrc } from "../../utils/images";
import ParsedCopy from "../ParsedCopy";
import styles from "./PartnershipSection.module.scss";

/**
 * PartnershipSection
 * Section displaying what does car insurance cover in canada in an accordion
 */
function PartnershipSection(props) {
  const { content } = props;

  const screenWidth = useWindowWidth();

  const imageString = screenWidth < breakpoints.lg ? "imageSmall" : "image";

  return (
    <section className={styles.spacings}>
      <div className={styles.contentContainer}>
        <h2 className={styles.heading}>{content.headline}</h2>
        <ParsedCopy copy={content.copy} animatedLinks />
      </div>
      <div className={styles.imageMobile}>
        <Image
          loader={customLoader}
          src={imageSrc(content, imageString)}
          alt={imageAlt(content, imageString)}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  );
}

PartnershipSection.propTypes = {
  content: PropTypes.shape({
    headline: PropTypes.string,
    copy: PropTypes.string,
  }).isRequired,
};

export default PartnershipSection;
