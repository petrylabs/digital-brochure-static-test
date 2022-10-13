import React, { useContext } from "react";
import { array, string } from "prop-types";

import headerData from "../../site-data/header.preval";
import styles from "./HamburgerButton.module.scss";
import LanguageContext from "../../context/language";

/**
 * HamburgerButton
 * Animated "hamburger" menu button for mobile & tablet navigation.
 */
function HamburgerButton(props) {
  const { lang } = useContext(LanguageContext);

  const { ariaControls, state } = props;
  const [isExpanded, setIsExpanded] = state;
  const content = headerData[lang].headerMenu;

  return (
    <button
      type="button"
      onClick={() => setIsExpanded(!isExpanded)}
      aria-controls={ariaControls}
      aria-expanded={isExpanded}
      className={`${styles.hamburger} ${isExpanded ? styles.active : ""}`}
    >
      <span className={styles.hamburgerBox}>
        <span className={styles.hamburgerInner} />
      </span>

      {/* For a11y */}
      <span className="visually-hidden">{content.toggleNavigation}</span>
    </button>
  );
}

HamburgerButton.propTypes = {
  ariaControls: string.isRequired,
  state: array.isRequired,
};

export default HamburgerButton;
