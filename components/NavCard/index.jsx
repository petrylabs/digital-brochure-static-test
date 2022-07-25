import React from "react";
import PropTypes from "prop-types";
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
      {/* Use ternary operator to make sure it won't display 0 in case it validates to false */}
      {isNew.length ? <span className={styles.newTag}>{isNew}</span> : ""}
      <p className={styles.subText}>{subText}</p>
    </a>
  );
}

NavCard.propTypes = {
  url: PropTypes.string,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  isNew: PropTypes.string,
};

export default NavCard;
