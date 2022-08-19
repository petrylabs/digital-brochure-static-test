import React, { useRef, useState } from "react";
import { useEffect } from "react";

import headerData from "../../site-data/header.preval";
import NavCard from "../NavCard";
import styles from "./NavDesktop.module.scss";

/**
 * NavDesktop
 * Header navigation for desktop screen widths
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179966476/NavDesktop
 */
function NavDesktop(props) {
  const { isExpanded, setIsExpanded, setPanelHeight } = props;

  /* Restructure content: */
  const content = headerData.data.headerMenu;
  const navItems = Object.entries(content.menuItems)
    .sort((a, b) => a[1].order - b[1].order)
    .map((item) => {
      return {
        menuItem: item[0],
        ...item[1],
      };
    });

  /* Handle visible submenu: */
  const [visibleSubmenu, setVisibleSubmenu] = useState(isExpanded);
  const submenuId = "desktop-submenu";
  const subNavRef = useRef();
  const handleExpand = (item) => {
    setVisibleSubmenu(item);
    setIsExpanded(true);
  };

  /* Handle submenu height: */
  useEffect(() => {
    if (isExpanded) {
      setPanelHeight(subNavRef.current?.offsetHeight);
    } else {
      setPanelHeight(0);
    }
  });

  return (
    <nav>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.order}>
            <button
              type="button"
              onMouseEnter={() => handleExpand(item)}
              onClick={() => handleExpand(item)}
              aria-controls={submenuId}
              aria-expanded={!!visibleSubmenu}
            >
              {item.menuItem}
            </button>

            {/* SUBMENU */}
            {isExpanded && (
              <ul
                ref={subNavRef}
                id={submenuId}
                className={styles.subNav}
                aria-labelledby={visibleSubmenu.menuItem}
              >
                {visibleSubmenu.subItems.map((subItem) => (
                  <li key={subItem.buttonId}>
                    <NavCard
                      url={subItem.url}
                      mainText={subItem.header}
                      subText={subItem.subtext}
                      isNew={subItem.isNew}
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavDesktop;
