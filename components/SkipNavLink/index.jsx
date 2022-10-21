import React, { useContext } from "react";
import { locales } from "../../config";
import LanguageContext from "../../context/language";

import headerData from "../../site-data/header.preval";
import styles from "./SkipNavLink.module.scss";

/**
 * SkipNavLink
 * Focus-accessible link to the `main` element. Required for accessibility.
 */
function SkipNavLink() {
  const { lang } = useContext(LanguageContext);
  const content = headerData[lang]?.headerMenu;

  return (
    <a href="#main-content" className={styles.skipNavLink}>
      {content.skipToMainContent}
    </a>
  );
}

export default SkipNavLink;
