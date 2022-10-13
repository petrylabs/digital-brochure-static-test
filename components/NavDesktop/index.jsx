import { useContext, useEffect, useRef, useState } from "react";
import { locales } from "../../config";
import LanguageContext from "../../context/language";

import getNavigation from "../../utils/navigation";
import NavCard from "../NavCard";
import styles from "./NavDesktop.module.scss";

/**
 * NavDesktop
 * Header navigation for desktop screen widths
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179966476/NavDesktop
 */
function NavDesktop(props) {
  const { isExpanded, setIsExpanded, setPanelHeight } = props;
  const { lang } = useContext(LanguageContext);

  const navItems = getNavigation(lang);

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
        {navItems.map((item, index) => (
          <li key={item.order}>
            <button
              type="button"
              onMouseEnter={() => handleExpand(item)}
              onClick={() => handleExpand(item)}
              aria-controls={submenuId}
              aria-expanded={!!visibleSubmenu}
              className={`${styles.navItem} ${
                item.menuItem === visibleSubmenu.menuItem
                  ? styles.navItemActive
                  : ""
              }`}
            >
              <span className={styles.navItemText}>{item.menuItem}</span>
              <span className={styles.navItemFocus}>+</span>
            </button>

            {/* SUBMENU */}
            {isExpanded && item.menuItem === visibleSubmenu.menuItem && (
              <ul
                ref={subNavRef}
                id={submenuId}
                className={styles.subNav}
                aria-labelledby={visibleSubmenu.menuItem}
                style={{
                  gridTemplateRows: `repeat(${index === 0 ? 4 : 2}, auto)`,
                }}
              >
                {visibleSubmenu.subItems.map((subItem) => (
                  <li key={subItem.buttonId} className={styles.subItem}>
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
