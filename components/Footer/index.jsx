import React from "react";
import styles from "./Footer.module.scss";
import NavItem from "../NavItem";
import footerData from "../../site-data/footer.preval";
import parse from "html-react-parser";

/**
 * Footer
 * Page footer; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179049009/Footer
 */
function Footer() {
  const content = footerData.data.footerMenu;

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerMenu}>
          {content.footerMenu.map((menu, i) => {
            return (
              <div key={i} className={styles.col}>
                <span className={styles.menuLabel}>{menu.category}</span>
                <span className={styles.menuItems}>
                  {menu.menuItems.map((item, i) => (
                    <span key={i} className={styles.navItem}>
                      <NavItem href={item.url} title={item.name}></NavItem>
                    </span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
        <div className={styles.horizontalFooterMenu}>
          {content.footerHorizontalMenu.map((item, i) => (
            <span key={i} className={styles.navItem}>
              <NavItem href={item.url} title={item.name}></NavItem>
            </span>
          ))}
          <span className={styles.navItem}>
            <NavItem
              href={"https://www.sonnet.ca/fr"}
              title={"Français"}
              style={{ fontFamily: "Averta-ExtraBold" }}
              externalLink={false}
            ></NavItem>
          </span>
        </div>
        <div className={styles.legalFooter}>
          {content.legalFooter.map((item, i) => {
            return (
              <span key={i}>
                {parse(item.copy, {
                  replace: (domNode) => {
                    const { name, attribs } = domNode;
                    if (name === "snt-link") {
                      return (
                        <NavItem
                          href={attribs.href}
                          title={attribs.title}
                          style={{ color: "#147582" }}
                        ></NavItem>
                      );
                    }
                  },
                })}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Footer;
