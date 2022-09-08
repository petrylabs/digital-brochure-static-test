import React, { Fragment } from "react";
import parse from "html-react-parser";

import footerData from "../../site-data/footer.preval";
import NavItem from "../NavItem";
import styles from "./Footer.module.scss";

/**
 * Footer
 * Page footer; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179049009/Footer
 */
function Footer() {
  const content = footerData.data.footerMenu;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Primary menus */}
        <div className={styles.footerMenu}>
          {content.footerMenu.map((menu, i) => (
            <nav key={i} className={styles.col}>
              <p className={`h5 ${styles.menuLabel}`}>{menu.category}</p>
              <ul className={styles.menuItems}>
                {menu.menuItems.map((item, i) => (
                  <li key={i} className={styles.navItem}>
                    <NavItem href={item.url} title={item.name} />
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
              <NavItem href={item.url} title={item.name} />
            </li>
          ))}
          <li className={styles.navItem}>
            {/* TODO: translate */}
            <NavItem
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
                      <NavItem
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
