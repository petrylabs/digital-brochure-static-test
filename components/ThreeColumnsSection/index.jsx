import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import InfoCard from "../InfoCard";
import ThreeItemLayout from "../ThreeItemLayout";
import { replaceToLink } from "../../utils/string";
import imgDate from "../../icons/icons.json";
import styles from "../ThreeColumnsSection/ThreeColumnsSection.module.scss";

/**
 * ThreeColumnsSection(WhyBuySection, How can I save)
 * @docs https://economical.atlassian.net/browse/SKY-208
 * @docs https://economical.atlassian.net/browse/SKY-213
 */

function ThreeColumnsSection(props) {
  const { titleBlock, content, className } = props;
  const { headline, copy } = titleBlock;
  const { fields } = content;

  const alteredCopy = copy ? replaceToLink(copy) : "";
  const threeColumns = Object.entries(fields).filter((item) => {
    if (item[0].includes("ThreeColumnWidget.generic")) {
      return item;
    }
  });

  // 1. check which landing page it is
  const pageTitle = content.title.substring(0, content.title.indexOf(" "));
  // 2. check which section is rendered
  const isWhyBuySection = headline.includes("Why buy");
  // 3. create iconUrls array that has only iconUrls for the section and used on line 47
  const iconUrls = isWhyBuySection
    ? imgDate[pageTitle].WhyBuySection
    : imgDate[pageTitle].HowCanISection;

  return (
    <section className={className}>
      <div className={styles.textContainer}>
        <h2 className={styles.heading}>{headline}</h2>
        {alteredCopy && <>{parse(alteredCopy)}</>}
      </div>
      <ThreeItemLayout>
        {threeColumns.map((item, i) => (
          // eslint-disable-next-line react/jsx-key
          <InfoCard
            iconUrl={iconUrls[i].largeIconUrl}
            title={item[1][0].headline}
            content={parse(item[1][0].copy)}
            withBorder={isWhyBuySection && true}
          />
        ))}
      </ThreeItemLayout>
    </section>
  );
}

ThreeColumnsSection.propTypes = {
  titleBlock: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    copy: PropTypes.string,
  }).isRequired,
  content: PropTypes.shape({
    fields: PropTypes.object.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
};

ThreeColumnsSection.defaultProps = {
  className: "",
};

export default ThreeColumnsSection;
