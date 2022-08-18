import React, { useContext, useState } from "react";

import { breakpoints } from "../../config";
import ModalContext from "../../context/modal";
import useWindowWidth from "../../hooks/useWindowWidth";
import useScrolledPast from "../../hooks/useScrolledPast";
import headerData from "../../site-data/header.preval";
import CTA from "../CTA";
import HamburgerButton from "../HamburgerButton";
import HomeLogoLink from "../HomeLogoLink";
import SkipNavLink from "../SkipNavLink";
import styles from "./Header.module.scss";
import NavCard from "../NavCard";

/**
 * Header
 * Page header; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179900955/Header
 */
function Header() {
  const content = headerData.data.headerMenu;
  const navItems = Object.entries(content.menuItems)
    .sort((a, b) => a[1].order - b[1].order)
    .map((item) => {
      return {
        menuItem: item[0],
        ...item[1],
      };
    });

  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleSubmenu, setVisibleSubmenu] = useState(null);
  const submenuId = "desktop-submenu";

  /* Handling screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isDesktop = screenWidth >= breakpoints.lg;

  /* Handling modal display: */
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  /* Handle scrolling: */
  const hasScrolled = useScrolledPast(150);

  return (
    <header
      className={styles.header}
      onMouseLeave={() => {
        if (isDesktop) setVisibleSubmenu(null);
      }}
    >
      <SkipNavLink />

      {/* HEADER BAR ----------------------------------------------------------- */}
      <div className={styles.headerBar}>
        <HomeLogoLink />

        {!isDesktop && (
          <div className={styles.mobileNavbar}>
            {!isExpanded && (
              <CTA
                type="primary"
                small={isMobile}
                onClick={() => setIsQuoteModalOpen(true)}
              >
                {isMobile ? content.gaqSmall : content.gaq}
              </CTA>
            )}
            <HamburgerButton
              ariaControls="mobile-nav"
              state={[isExpanded, setIsExpanded]}
            />
          </div>
        )}

        {isDesktop && (
          <>
            <nav>
              {navItems &&
                navItems.map((item) => (
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
                ))}
            </nav>

            {/* Secondary Nav */}
            {/* TODO: replace with secondary nav component? */}
            <div className={styles.secondaryNav}>
              {hasScrolled ? (
                <CTA type="primary" onClick={() => setIsQuoteModalOpen(true)}>
                  {content.gaq}
                </CTA>
              ) : (
                <>extra links here</>
              )}
            </div>
          </>
        )}
      </div>

      {/* EXPANSION PANEL ----------------------------------------------------------- */}
      {isDesktop && (
        <div id={submenuId} className={styles.headerPanelDesktop}>
          {/* SUBMENU */}
          {!!visibleSubmenu && (
            <nav
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
          {/* TODO: search input */}
        </div>
      )}

      {!isDesktop && (
        // TODO: replace with mobile/tablet nav
        <div
          id="mobile-nav"
          className={styles.headerPanelMobile}
          style={{ maxHeight: isExpanded ? `100vh` : `0px` }}
        >
          mobile nav
        </div>
      )}
    </header>
  );
}

export default Header;
