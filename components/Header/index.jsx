import React from "react";

import styles from "./Header.module.scss";

/**
 * Header
 * Page header; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179900955/Header
 */
function Header() {
  return (
    <header className={styles.header}>
      {/* Skip link */}
      <a
        href="#main-content"
        className={`visually-hidden-focusable ${styles.skipNavLink}`}
      >
        {/* TODO: populate from CMS */}
        Skip to main content
      </a>

      {/* Wordmark / Home link */}
      <a href="https://www.sonnet.ca">Sonnet</a>

      {/* Main Nav */}
      <div>main nav here</div>

      {/* Secondary Nav */}
      <div>extra links here</div>
    </header>
  );
}

export default Header;
