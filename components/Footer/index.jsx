import React, { Fragment, useState } from "react";
import parse from "html-react-parser";

import footerData from "../../site-data/footer.preval";
import FooterLink from "../FooterLink";
import styles from "./Footer.module.scss";

/**
 * Replace <snt-link> with <FooterLink /> in copy
 * @param {string} copy
 */
const formatLegalFooter = (copy) => {
  return parse(copy, {
    replace: (domNode) => {
      const { name, attribs } = domNode;
      if (name === "snt-link") {
        return (
          <FooterLink
            classes={styles.legalNavItem}
            href={attribs.href}
            title={attribs.title}
          />
        );
      }
    },
  });
};

/**
 * Footer
 * Page footer; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179049009/Footer
 */
function Footer({ pageFooterData }) {
  const content = footerData.data.footerMenu;
  const [showLegalFooter, setShowLegalFooter] = useState(false);

  /* Some main nav links have `name` property that doesn't match what's on screen... */
  const modifyMenu = (menu) => {
    if (menu.category === "Social") {
      /* Remove "Sonnet " from link name */
      return menu.menuItems.map((item) => {
        return { ...item, name: item.name.substring(7) };
      });
    } else {
      return menu.menuItems;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Primary menus */}
        <div className={styles.footerMenu}>
          {content.footerMenu.map((menu, i) => (
            <nav key={i} className={styles.col}>
              <p className={`h5 ${styles.menuLabel}`}>{menu.category}</p>
              <ul className={styles.menuItems}>
                {modifyMenu(menu).map((item, i) => (
                  <li key={i} className={styles.navItem}>
                    <FooterLink href={item.url} title={item.name} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Secondary menu */}
        <ul className={styles.horizontalFooterMenu}>
          {content.footerHorizontalMenu.map((item, i) => (
            <li key={i} className={styles.navItem}>
              <FooterLink href={item.url} title={item.name} />
            </li>
          ))}
          <li className={styles.navItem}>
            {/* TODO: translate */}
            <FooterLink
              href={"https://www.sonnet.ca/fr"}
              title={"Français"}
              style={{ fontFamily: "Averta-ExtraBold" }}
              externalLink={false}
            />
          </li>
        </ul>

        {/* Primary legal content */}
        <div className={styles.legalFooter}>
          {formatLegalFooter(content?.legalFooter[0]?.copy)}
        </div>

        {/* Expanding legal content */}
        <div id="legal-footer">
          <button
            className={styles.legalAccordianButton}
            aria-expanded={showLegalFooter}
            onClick={() => setShowLegalFooter(!showLegalFooter)}
          >
            <span
              className={`${styles.legalAccordianIcon} ${
                showLegalFooter
                  ? styles.legalAccordianIconMinus
                  : styles.legalAccordianIconPlus
              }`}
            ></span>
            <span className={styles.legalAccordianButtonText}>
              {/* TODO: translate */}
              {showLegalFooter ? "Hide Legal" : "View Legal"}
            </span>
          </button>

          {showLegalFooter && (
            <div className={styles.legalFooter} aria-labelledby="legal-footer">
              {content.accordionLegalFooter.map((item, i) => (
                <Fragment key={i}>{formatLegalFooter(item.copy)}</Fragment>
              ))}
              {pageFooterData.map((item, i) => (
                <Fragment key={i}>{formatLegalFooter(item.copy)}</Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
