import React from "react";
import PropTypes from "prop-types";
import styles from "./NavCard.module.scss";

/**
 * NavCard
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178983474/NavCard
 */

function NavCard(props) {
  const { mainText, url, subText, isNew } = props;
  const handleClick = () => {
    window.location.replace(url);
  };

  return (
    <>
      <div className={styles.navcardContainer} onClick={handleClick}>
        <div className={styles.navItem}>
          <a href={url} className={styles.mainText}>
            {mainText}
          </a>
          {isNew && <span className={styles.newTag}>New!</span>}
          <div className={styles.subText}>{subText}</div>
        </div>
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
