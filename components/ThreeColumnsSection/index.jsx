import React from "react";
import PropTypes from "prop-types";

import { breakpoints } from "../../config";
import useWindowWidth from "../../hooks/useWindowWidth";
import InfoCard from "../InfoCard";
import ThreeItemLayout from "../ThreeItemLayout";
import ParsedCopy from "../ParsedCopy";
import styles from "./ThreeColumnsSection.module.scss";

/**
 * ThreeColumnsSection(For WhyBuySection, How can I save)
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43278467425/ThreeColumnsSection
 */

function ThreeColumnsSection(props) {
  const { introContent, columnContent, className } = props;
  const { headline, copy } = introContent;
  const { fields } = columnContent;

  const threeColumns = Object.entries(fields[0]).filter((item) => {
    if (item.toString().includes("generic")) {
      return item;
    }
  });

  /* Handle screen sizes: */
  const screenWidth = useWindowWidth();
  const isDesktop = screenWidth >= breakpoints.lg;

  // check which section is rendered to apply certain css
  const isWhyBuySection = headline.includes("Why buy");

  return (
    <section className={`${styles.section} ${className}`}>
      <div className={styles.textContainer}>
        <h2>{headline}</h2>
        {copy && <ParsedCopy copy={copy} animatedLinks />}
      </div>

      <ThreeItemLayout variableGap>
        {threeColumns.map((item, i) => {
          const smallIconUrl = item[1].iconSmall.fileAsset
            ? item[1].iconSmall.fileAsset
            : item[1].icon.fileAsset;
          return (
            <InfoCard
              key={item[1].identifier}
              iconUrl={isDesktop ? item[1].icon.fileAsset : smallIconUrl}
              title={item[1].headline}
              alt={item[1].icon.altText}
              content={item[1].copy}
              withBorder={isWhyBuySection}
            />
          );
        })}
      </ThreeItemLayout>
    </section>
  );
}

ThreeColumnsSection.propTypes = {
  /** Intro content object: headline and copy if available*/
  introContent: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    copy: PropTypes.string,
  }).isRequired,
  /** Column content object: the contents goes into the InfoCard*/
  columnContent: PropTypes.shape({
    fields: PropTypes.array.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
};

ThreeColumnsSection.defaultProps = {
  className: "",
};

export default ThreeColumnsSection;
