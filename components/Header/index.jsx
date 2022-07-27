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
      <a href="www.sonnet.ca">Sonnet</a>

      <div>main nav here</div>

      <div>extra links here</div>
    </header>
  );
}

export default Header;
