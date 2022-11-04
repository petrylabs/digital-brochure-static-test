import React, { useContext } from "react";
import PropTypes from "prop-types";

import headerData from "../../site-data/header.preval";
import styles from "./NavSecondary.module.scss";
import LanguageContext from "../../context/language";
import { locales } from "../../config";
import { useRouter } from "next/router";
import { getTogglePath, getCurrentPath } from "../../utils";
import CartLink from "../CartLink";

/**
 * NavSecondary
 * Secondary links used in both mobile and desktop navigation
 */
function NavSecondary(props) {
  const router = useRouter();
  const { ariaControls, ariaExpanded, searchToggleFn } = props;
  const { lang } = useContext(LanguageContext);
  const content = headerData[lang]?.headerMenu;
  const toggleLocale = lang === locales.en ? locales.fr : locales.en;
  const currentPath = getCurrentPath(router);
  const togglePath = getTogglePath(currentPath, toggleLocale)?.path;
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
        {/* TODO: translate */}
        <span className="visually-hidden">Search</span>
        <span className={styles.searchIcon} />
      </button>

      {/* Language toggle */}
      <a
        href={togglePath || (lang === locales.en ? "fr" : "/")}
        className={styles.link}
      >
        <span aria-hidden>
          {content.toggleLanguage === "Français" ? "Fr" : "En"}
        </span>
        <span className="visually-hidden">{content.toggleLanguage}</span>
      </a>

      {/* Login */}
      <span className={styles.loginLinkWrapper}>
        <a
          href={content.loginLink}
          className={`${styles.link} ${styles.loginLink}`}
        >
          {content.loginStr}
        </a>
      </span>
      <CartLink />
    </nav>
  );
}

NavSecondary.propTypes = {
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.bool,
  searchToggleFn: PropTypes.func,
};

export default NavSecondary;
