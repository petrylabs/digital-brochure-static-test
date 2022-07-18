import React from "react";

import styles from "./QuoteModalContent.module.scss";

/**
 * QuoteModalContent
 * The body of the "Get a quote" modal (displayed inside a `Modal`)
 */
function QuoteModalContent() {
  return (
    <>
      <div className={styles.text}>
        <h1>Let&apos;s get insured</h1>
        <p>
          It only takes 5 minutes. What type of insurance are you looking for?
        </p>
      </div>

      <ul className={styles.linksList}>
        <li>
          <a href="#" className={styles.link}>
            {/* link heading here */}
            {/* icon here */}
            <span>Home &amp; Auto</span>
          </a>
        </li>
        <li>
          <a href="#" className={styles.link}>
            {/* icon here */}
            <span>Auto</span>
          </a>
        </li>
        <li>
          <a href="#" className={styles.link}>
            {/* icon here */}
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#" className={styles.link}>
            {/* link heading here */}
            {/* icon here */}
            <span>Pet</span>
          </a>
        </li>
      </ul>
    </>
  );
}

export default QuoteModalContent;
