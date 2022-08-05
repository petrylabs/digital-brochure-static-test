import React from "react";
import { array, string } from "prop-types";

import headerData from "../../site-data/header.preval";
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
      aria-expanded={isExpanded}
      className={`hamburger hamburger--squeeze js-hamburger ${
        styles.hamburgerCustom
      } ${isExpanded ? "is-active" : ""}`}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>

      {/* For a11y */}
      <span className="visually-hidden">
        {headerData.data.headerMenu.toggleNavigation}
      </span>
    </button>
  );
}

HamburgerButton.propTypes = {
  ariaControls: string.isRequired,
  state: array.isRequired,
};

export default HamburgerButton;
