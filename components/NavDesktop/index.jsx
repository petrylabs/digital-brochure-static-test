import React, { useState } from "react";

import headerData from "../../site-data/header.preval";
import NavCard from "../NavCard";
import styles from "./NavDesktop.module.scss";

/**
 * NavDesktop
 * Header navigation for desktop screen widths
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179966476/NavDesktop
 */
function NavDesktop(props) {
  const { isExpanded, setIsExpanded } = props;

  const content = headerData.data.headerMenu;
  const navItems = Object.entries(content.menuItems)
    .sort((a, b) => a[1].order - b[1].order)
    .map((item) => {
      return {
        menuItem: item[0],
        ...item[1],
      };
    });

  const [visibleSubmenu, setVisibleSubmenu] = useState(null);
  const submenuId = "desktop-submenu";

  return (
    <nav className={styles.navList}>
      {navItems.map((item) => (
        <>
          <button
            key={item.order}
            type="button"
            onMouseEnter={() => setVisibleSubmenu(item)}
            onClick={() => setVisibleSubmenu(item)}
            aria-controls={submenuId}
            aria-expanded={!!visibleSubmenu}
          >
            {item.menuItem}
          </button>

          {/* SUBMENU */}
          {visibleSubmenu && item.menuItem === visibleSubmenu.menuItem && (
            <nav
              id={submenuId}
              className={styles.subNavDesktop}
              aria-labelledby={visibleSubmenu.menuItem}
            >
              {visibleSubmenu.subItems.map((subItem) => (
                <NavCard
                  key={subItem.buttonId}
                  url={subItem.url}
                  mainText={subItem.header}
                  subText={subItem.subtext}
                  isNew={subItem.isNew}
                />
              ))}
            </nav>
          )}
        </>
      ))}
    </nav>
  );
}

export default NavDesktop;
