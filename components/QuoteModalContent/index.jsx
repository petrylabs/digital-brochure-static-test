/* eslint-disable @next/next/no-img-element */
import React from "react";
import parse from "html-react-parser";

import { baseUrl } from "../../config.js";
import gaqModalData from "../../site-data/gaqModal.preval.js";
import styles from "./QuoteModalContent.module.scss";

/**
 * QuoteModalContent
 * The body of the "Get a quote" modal (displayed inside a `Modal`)
 */
function QuoteModalContent() {
  const content = gaqModalData.data.content;

  const menuItem = (i) => content[i].fields["GetAQuoteButtons.menuItem"][0];
  const iconSrc = (i, name) =>
    `${baseUrl}/dA/${
      content[i].fields[`GetAQuoteButtons.${name}`][0].identifier
    }`;

  console.log(content);
  return (
    <article>
      <div className={styles.text}>
        <h1>{content[0].headline}</h1>
        {parse(content[0].copy)}
      </div>

      <ul className={styles.linksList}>
        {/* Home & Auto */}
        <li>
          <a
            href={menuItem(1).url}
            className={styles.link}
            target={menuItem(1).urlTarget}
          >
            <div className={`${styles.linkHeading} ${styles.linkHeadingDark}`}>
              {content[1].buttonHighlightText}
            </div>
            <div className={styles.linkPanel}>
              <img src={iconSrc(1, "lefticonlg")} alt="" />
              <img src={iconSrc(1, "righticonlg")} alt="" />
              <div>{menuItem(1).menuItem}</div>
            </div>
          </a>
        </li>

        {/* Auto */}
        <li>
          <a
            href={menuItem(2).url}
            className={styles.link}
            target={menuItem(2).urlTarget}
          >
            <div className={styles.linkPanel}>
              <img src={iconSrc(2, "lefticonlg")} alt="" />
              <div>{menuItem(2).menuItem}</div>
            </div>
          </a>
        </li>

        {/* Home */}
        <li>
          <a href="#" className={styles.link}>
            <div className={styles.linkPanel}>
              {/* icon here */}
              <div>?</div>
            </div>
          </a>
        </li>

        {/* Pet */}
        <li>
          <a href="#" className={`${styles.link} ${styles.linkLightBorder}`}>
            <div className={`${styles.linkHeading} ${styles.linkHeadingLight}`}>
              {content[3].buttonHighlightText}
            </div>
            <div className={styles.linkPanel}>
              <img src={iconSrc(3, "lefticonlg")} alt="" />
              <div>Pet</div>
            </div>
          </a>
        </li>
      </ul>
    </article>
  );
}

export default QuoteModalContent;
