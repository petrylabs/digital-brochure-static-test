import React from "react";

import headerData from "../../site-data/header.preval";
import styles from "./SkipNavLink.module.scss";

/**
 * SkipNavLink
 * Focus-accessible link to the `main` element. Required for accessibility.
 */
function SkipNavLink() {
  return (
    <a href="#main-content" className={styles.skipNavLink}>
      {headerData.data.headerMenu.skipToMainContent}
    </a>
  );
}

export default SkipNavLink;
