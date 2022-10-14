import React, { useContext } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import { breakpoints } from "../../config";
import useWindowWidth from "../../hooks/useWindowWidth";
import { customLoader, imageAlt, imageSrc } from "../../utils/images";
import ParsedCopy from "../ParsedCopy";
import styles from "./PartnershipSection.module.scss";
import LanguageContext from "../../context/language";
import { getLanguageId } from "../../utils/languageVariable";

/**
 * PartnershipSection
 * Section displaying what does car insurance cover in canada in an accordion
 */
function PartnershipSection(props) {
  const { lang } = useContext(LanguageContext);
  const { content } = props;
  const languageId = getLanguageId(lang);

  const screenWidth = useWindowWidth();

  const imageString = screenWidth < breakpoints.lg ? "imageSmall" : "image";

  return (
    <section className={styles.spacings}>
      <div className={styles.contentContainer}>
        <h2 className={styles.heading}>{content.headline}</h2>
        <ParsedCopy copy={content.copy} />
      </div>
      <div className={styles.imageMobile}>
        <Image
          loader={customLoader}
          src={imageSrc(content, imageString, languageId)}
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
