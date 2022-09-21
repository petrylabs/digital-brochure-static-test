import React from "react";
import styles from "./TrustPilot.module.scss";
/**
 * Trust Pilot
 * Trust Pilot section for home page.
 */
function TrustPilot() {
  return (
    <div
      className={styles.container}
      data-locale="en-US"
      data-template-id="54ad5defc6454f065c28af8b"
      data-businessunit-id="5e4e0b7438d2d60001f5dc90"
      data-style-height="240px"
      data-style-width="100%"
      data-theme="light"
      data-tags="CMS-Trust"
      data-stars="4,5"
      data-review-languages="en" // TODO: translate
      data-text-color="#323232"
    >
      <a
        href="https://www.trustpilot.com/review/www.sonnet.ca"
        target="_blank"
        rel="noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
}

export default TrustPilot;
