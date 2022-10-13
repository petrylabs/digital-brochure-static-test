import React, { Fragment, useState, useContext } from "react";
import footerData from "../../site-data/footer.preval";
import FooterLink from "../FooterLink";
import ParsedCopy from "../ParsedCopy";
import styles from "./Footer.module.scss";
import PageFooterContext from "../../context/pageFooter";
import LanguageContext from "../../context/language";
import { getLanguageVariable } from "../../utils/languageVariable";

/**
 * Footer
 * Page footer; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179049009/Footer
 */

function Footer() {
  const { lang } = useContext(LanguageContext);
  const content = footerData[lang].data.footerMenu;
  const [showLegalFooter, setShowLegalFooter] = useState(false);
  const { pageFooterData } = useContext(PageFooterContext);

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
            <FooterLink
              href={"https://www.sonnet.ca/fr"}
              title={getLanguageVariable("toggle-Language", lang)}
              style={{ fontFamily: "Averta-ExtraBold" }}
              externalLink={false}
            />
          </li>
        </ul>

        {/* Legal footer */}
        <div className={styles.legalFooter}>
          <ParsedCopy copy={content?.legalFooter[0]?.copy} />

          {/* Expanding legal content */}
          <details onToggle={() => setShowLegalFooter(!showLegalFooter)}>
            <summary
              className={`${styles.legalDetailsButton} ${
                showLegalFooter
                  ? styles.legalDetailsShow
                  : styles.legalDetailsHide
              }`}
            >
              <span>
                {showLegalFooter
                  ? content.accordionTextHide
                  : content.accordionTextShow}
              </span>
            </summary>

            {content.accordionLegalFooter.map((item) => (
              <Fragment key={item.identifier}>
                <ParsedCopy copy={item.copy} />
              </Fragment>
            ))}
            {pageFooterData?.map((item) => (
              <Fragment key={item.identifier}>
                <ParsedCopy copy={item.copy} />
              </Fragment>
            ))}
          </details>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
