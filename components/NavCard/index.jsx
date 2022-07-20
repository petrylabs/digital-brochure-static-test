import React from "react";
import PropTypes from "prop-types";
import styles from "./NavCard.module.scss";

/**
 * NavCard
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179114937/Modal
 */

function NavCard(props) {
  const { mainText, url, subText, isNew } = props;

  return (
    <>
      <div className={styles.navcardContainer}>
        <a href={url} className={styles.mainText}>
          {mainText}
        </a>
        {isNew && <span className={styles.newTag}>New!</span>}
        <div className={styles.subText}>{subText}</div>
      </div>
    </>
  );
}

NavCard.propTypes = {
  url: PropTypes.string,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  isNew: PropTypes.bool,
};

export default NavCard;
