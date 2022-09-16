import React from "react";
import PropTypes from "prop-types";

import styles from "./TextSection.module.scss";
import ParsedCopy from "../ParsedCopy";

/**
 * TextSection
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179769946/TextSection
 */

function TextSection(props) {
  const { title, copy } = props;

  return (
    <section className={styles.section}>
      {title && <h2 className={styles.heading}>{title}</h2>}
      {copy && <ParsedCopy copy={copy} animatedLinks />}
    </section>
  );
}

TextSection.propTypes = {
  title: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
};

export default TextSection;
