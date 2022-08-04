import React from "react";
import { arrayOf, bool, func, oneOf, string } from "prop-types";

import styles from "./HamburgerButton.module.scss";

/**
 * HamburgerButton
 * Animated "hamburger" menu button for mobile & tablet navigation.
 * Uses styling/animation classes included in `sonnet.css`
 */
function HamburgerButton(props) {
  const { ariaControls, state } = props;
  const [isExpanded, setIsExpanded] = state;

  return (
    <button
      type="button"
      onClick={() => setIsExpanded(!isExpanded)}
      aria-controls={ariaControls}
      className={`hamburger hamburger--squeeze js-hamburger ${
        styles.hamburgerCustom
      } ${isExpanded ? "is-active" : ""}`}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>

      {/* For a11y */}
      <span className="visually-hidden">
        {/* TODO: update & localize from CMS */}
        {isExpanded
          ? "close menu / fermer le menu"
          : "open menu / ouvrir le menu"}
      </span>
    </button>
  );
}

HamburgerButton.propTypes = {
  ariaControls: string.isRequired,
  state: arrayOf(oneOf([bool.isRequired, func.isRequired])).isRequired,
};

export default HamburgerButton;
