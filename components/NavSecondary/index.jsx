import React from "react";
import PropTypes from "prop-types";

import headerData from "../../site-data/header.preval";
import SearchIcon from "../../icons/SearchIcon";
import styles from "./NavSecondary.module.scss";

/**
 * NavSecondary
 * Secondary links used in both mobile and desktop navigation
 */
function NavSecondary(props) {
  const { ariaControls, ariaExpanded, searchToggleFn } = props;
  const content = headerData.data.headerMenu;

  return (
    <nav className={styles.nav}>
      {/* Search */}
      <button
        type="button"
        onClick={searchToggleFn}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        className={styles.searchButton}
      >
        <SearchIcon width="16px" height="16px" />
      </button>

      {/* Language toggle */}
      <a href="TODO" className={styles.link}>
        <span aria-hidden>
          {content.toggleLanguage === "Français" ? "Fr" : "En"}
        </span>
        <span className="visually-hidden">{content.toggleLanguage}</span>
      </a>

      {/* Login */}
      <a
        href={content.loginLink}
        className={`${styles.link} ${styles.loginLink}`}
      >
        {content.loginStr}
      </a>
    </nav>
  );
}

NavSecondary.propTypes = {
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.bool,
  searchToggleFn: PropTypes.func,
};

export default NavSecondary;
