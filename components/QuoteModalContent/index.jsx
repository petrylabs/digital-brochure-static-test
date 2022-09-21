/* eslint-disable @next/next/no-img-element */
import React from "react";

import { baseUrl } from "../../config.js";
import gaqModalData from "../../site-data/gaqModal.preval.js";
import ExternalLinkIcon from "../../icons/ExternalLinkIcon.jsx";
import ParsedCopy from "../ParsedCopy/index.jsx";
import styles from "./QuoteModalContent.module.scss";
import useWindowWidth from "../../hooks/useWindowWidth.js";
import { breakpoints } from "../../config";
/**
 * QuoteModalContent
 * The body of the "Get a quote" modal (displayed inside a `Modal`)
 */
function QuoteModalContent() {
  const content = gaqModalData.data.content;
  const menuItem = (i) => content[i]?.fields;
  const iconSrc = (i, name) =>
    `${baseUrl}/dA/${content[i]?.fields[name]?.identifier}`;
  const screenWidth = useWindowWidth();
  const leftIconSrc = screenWidth >= breakpoints.lg ? "lefticonlg" : "lefticonsm";
  const rightIconSrc = screenWidth >= breakpoints.lg ? "righticonlg" : "righticonsm";


  return (
    <article>
      <div className={styles.text}>
        <h2>{content[0].headline}</h2>
        <ParsedCopy copy={content[0].copy} />
      </div>

      <ul className={styles.linksList}>
        {/* Home & Auto */}
        <li>
          <a
            href={menuItem(1)?.menuItem.url}
            target={menuItem(1)?.menuItem.urlTarget}
            className={styles.link}
          >
            <div className={`${styles.linkHeading} ${styles.linkHeadingDark}`}>
              {content[1].buttonHighlightText}
            </div>
            <div className={styles.linkPanel}>
              <div className={styles.iconPanel}>
              <img src={iconSrc(1, leftIconSrc)} alt="" />
              <span className={styles.plus} />
              <img src={iconSrc(1, rightIconSrc)} alt="" />
              </div>
              <div><h4>{menuItem(1).menuItem.menuItem}</h4></div>
            </div>
          </a>
        </li>

        {/* Auto */}
        <li>
          <a
            href={menuItem(2)?.menuItem.url}
            target={menuItem(2)?.menuItem.urlTarget}
            className={styles.link}
          >
            <div className={styles.linkPanel}>
              <img src={iconSrc(2, leftIconSrc)} alt="" />
              <div><h4>{menuItem(2).menuItem.menuItem}</h4></div>
            </div>
          </a>
        </li>

        {/* Home */}
        <li>
          <a
            href={menuItem(3)?.menuItem.url}
            target={menuItem(3)?.menuItem.urlTarget}
            className={styles.link}
          >
            <div className={styles.linkPanel}>
              <img src={iconSrc(3, "lefticonlg")} alt="" />
              <div><h4>{menuItem(3).menuItem.menuItem}</h4></div>
            </div>
          </a>
        </li>

        {/* Pet */}
        <li>
          <a
            href={menuItem(4)?.menuItem.url}
            target={menuItem(4)?.menuItem.urlTarget}
            className={`${styles.link} ${styles.linkLightBorder}`}
          >
            <div className={`${styles.linkHeading} ${styles.linkHeadingLight}`}>
              {content[4].buttonHighlightText}
            </div>
            <div className={styles.linkPanel}>
              <img src={iconSrc(4, leftIconSrc)} alt="" />
              <div>
                <h4>{menuItem(4).menuItem.menuItem}
                <span className={styles.extIcon}>
                  <ExternalLinkIcon />
                </span>
                </h4>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </article>
  );
}

export default QuoteModalContent;
