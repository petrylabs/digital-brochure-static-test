import React from "react";

import styles from "./SkipNavLink.module.scss";

/**
 * SkipNavLink
 * Focus-accessible link to the `main` element. Required for accessibility
 */
function SkipNavLink() {
  return (
    <a href="#main-content" className={styles.skipNavLink}>
      {/* TODO: populate from CMS */}
      Skip to main content
    </a>
  );
}

export default SkipNavLink;
