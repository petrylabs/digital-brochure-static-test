import React from "react";

import gaqModalData from "../../site-data/gaqModal.preval.js";
import styles from "./QuoteModalContent.module.scss";

/**
 * QuoteModalContent
 * The body of the "Get a quote" modal (displayed inside a `Modal`)
 */
function QuoteModalContent() {
  const content = gaqModalData.data;

  console.log(gaqModalData);
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
            <span className={`${styles.linkHeading} ${styles.linkHeadingDark}`}>
              Save upto 20%
            </span>
            <span className={styles.linkPanel}>
              {/* icon here */}
              <span>Home &amp; Auto</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#" className={styles.link}>
            <span className={styles.linkPanel}>
              {/* icon here */}
              <span>Auto</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#" className={styles.link}>
            <span className={styles.linkPanel}>
              {/* icon here */}
              <span>Home</span>
            </span>
          </a>
        </li>
        <li>
          <a href="#" className={`${styles.link} ${styles.linkLightBorder}`}>
            <span
              className={`${styles.linkHeading} ${styles.linkHeadingLight}`}
            >
              NEW! Protect your furry loved one
            </span>
            <span className={styles.linkPanel}>
              {/* icon here */}
              <span>Pet</span>
            </span>
          </a>
        </li>
      </ul>
    </>
  );
}

export default QuoteModalContent;
