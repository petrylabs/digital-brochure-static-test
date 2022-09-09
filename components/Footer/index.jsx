import React, { Fragment } from "react";
import parse from "html-react-parser";

import footerData from "../../site-data/footer.preval";
import FooterLink from "../FooterLink";
import styles from "./Footer.module.scss";

/**
 * Footer
 * Page footer; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179049009/Footer
 */
function Footer() {
  const content = footerData.data.footerMenu;

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

        {/* Legal content */}
        <div className={styles.legalFooter}>
          {content.legalFooter.map((item, i) => (
            <Fragment key={i}>
              {parse(item.copy, {
                replace: (domNode) => {
                  const { name, attribs } = domNode;
                  if (name === "snt-link") {
                    return (
                      <FooterLink
                        href={attribs.href}
                        title={attribs.title}
                        style={{ color: "#147582" }}
                      />
                    );
                  }
                },
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
