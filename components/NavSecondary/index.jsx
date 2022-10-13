import React, { useContext } from "react";
import PropTypes from "prop-types";

import headerData from "../../site-data/header.preval";
import styles from "./NavSecondary.module.scss";
import LanguageContext from "../../context/language";
import { landingPageRoutes, languageId, locales } from "../../config";
import { useRouter } from "next/router";

/**
 * NavSecondary
 * Secondary links used in both mobile and desktop navigation
 */
function NavSecondary(props) {
  const router = useRouter();
  const { ariaControls, ariaExpanded, searchToggleFn } = props;
  const { setLanguage, lang } = useContext(LanguageContext);
  const content = headerData[lang].headerMenu;
  const toggleLocale = lang === locales.en ? locales.fr : locales.en;
  const currentPath = getCurrentPath(router);
  const togglePath = getTogglePath(currentPath, toggleLocale);

  const handleToggleLanguage = () => {
    setLanguage(toggleLocale);
    router.push(togglePath.path);
  };

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
      <a href="#" className={styles.link} onClick={handleToggleLanguage}>
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

const getCurrentPath = (router) => {
  if (router.pathname === "/[slug]") {
    return landingPageRoutes.find((item) => item.path === router.query.slug);
  } else {
    return landingPageRoutes.find((item) => item.path === router.asPath);
  }
};

const getTogglePath = (currentPath, toggleLanguage) => {
  return landingPageRoutes?.find(
    (item) =>
      item.query.pageId === currentPath?.query?.pageId &&
      item.query.locale === toggleLanguage
  );
};
