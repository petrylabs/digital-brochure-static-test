import React, { useState } from "react";

import styles from "./Header.module.scss";

/**
 * Header
 * Page header; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179900955/Header
 */
function Header() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className={styles.header} onMouseLeave={() => setIsExpanded(false)}>
      {/* Skip link */}
      <a href="#main-content" className={styles.skipNavLink}>
        {/* TODO: populate from CMS */}
        Skip to main content
      </a>

      <div className={`${styles.headerContainer} ${styles.headerBar}`}>
        {/* Wordmark / Home link */}
        <a href="https://www.sonnet.ca">Sonnet</a>

        {/* Main Nav */}
        {/* TODO: replace with desktop nav bar */}
        <div>
          <button
            type="button"
            onMouseEnter={() => setIsExpanded(true)}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-controls="expanded-panel"
            aria-expanded={isExpanded}
          >
            nav item
          </button>
        </div>

        {/* Secondary Nav */}
        <div>extra links here</div>
      </div>

      {/* Expansion panel */}
      {isExpanded && (
        <div
          id="expanded-panel"
          className={`${styles.headerContainer} ${styles.headerExpanded}`}
        >
          sub-navigation, search input
        </div>
      )}
    </header>
  );
}

export default Header;
