import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";

import styles from "./NavCard.module.scss";

/**
 * NavCard
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178983474/NavCard
 */

function NavCard(props) {
  const { mainText, url, subText, isNew } = props;

  return (
    <a href={url} className={styles.navLink}>
      <span>{mainText}</span>
      {/* TODO: translation */}
      {isNew && <span className={styles.newTag}>New!</span>}
      <p className={styles.subText}>{parse(subText)}</p>
    </a>
  );
}

NavCard.propTypes = {
  url: PropTypes.string,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  isNew: PropTypes.bool,
};

export default NavCard;
