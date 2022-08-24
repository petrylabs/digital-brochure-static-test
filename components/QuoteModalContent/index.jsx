/* eslint-disable @next/next/no-img-element */
import React from "react";
import parse from "html-react-parser";

import { baseUrl } from "../../config.js";
import gaqModalData from "../../site-data/gaqModal.preval.js";
import styles from "./QuoteModalContent.module.scss";
import ExternalLinkIcon from "../../icons/ExternalLinkIcon.jsx";

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
            target={menuItem(1).urlTarget}
            className={styles.link}
          >
            <div className={`${styles.linkHeading} ${styles.linkHeadingDark}`}>
              {content[1].buttonHighlightText}
            </div>
            <div className={styles.linkPanel}>
              <img src={iconSrc(1, "lefticonlg")} alt="" />
              <span className={styles.plus} />
              <img src={iconSrc(1, "righticonlg")} alt="" />
              <div>{menuItem(1).menuItem}</div>
            </div>
          </a>
        </li>

        {/* Auto */}
        <li>
          <a
            href={menuItem(2).url}
            target={menuItem(2).urlTarget}
            className={styles.link}
          >
            <div className={styles.linkPanel}>
              <img src={iconSrc(2, "lefticonlg")} alt="" />
              <div>{menuItem(2).menuItem}</div>
            </div>
          </a>
        </li>

        {/* Home */}
        <li>
          <a
            href={menuItem(3).url}
            target={menuItem(3).urlTarget}
            className={styles.link}
          >
            <div className={styles.linkPanel}>
              <img src={iconSrc(3, "lefticonlg")} alt="" />
              <div>{menuItem(3).menuItem}</div>
            </div>
          </a>
        </li>

        {/* Pet */}
        <li>
          <a
            href={menuItem(4).url}
            target={menuItem(4).urlTarget}
            className={`${styles.link} ${styles.linkLightBorder}`}
          >
            <div className={`${styles.linkHeading} ${styles.linkHeadingLight}`}>
              {content[4].buttonHighlightText}
            </div>
            <div className={styles.linkPanel}>
              <img src={iconSrc(4, "lefticonlg")} alt="" />
              <div>
                {menuItem(4).menuItem}
                <span className={styles.extIcon}>
                  <ExternalLinkIcon />
                </span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </article>
  );
}

export default QuoteModalContent;