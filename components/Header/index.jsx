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

/**
 * Header
 * Page header; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179900955/Header
 */
function Header() {
  const content = headerData.data.headerMenu;
  const [isExpanded, setIsExpanded] = useState(false);

  /* Handling screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isDesktop = screenWidth >= breakpoints.lg;

  /* Handling modal display: */
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  /* Handle scrolling: */
  const hasScrolled = useScrolledPast();

  console.log(content);

  return (
    <header
      className={styles.header}
      onMouseLeave={() => {
        if (isDesktop) setIsExpanded(false);
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
            {/* TODO: replace with desktop nav bar */}
            <div>
              <button
                type="button"
                onMouseEnter={() => setIsExpanded(true)}
                onClick={() => setIsExpanded(!isExpanded)}
                aria-controls="expanded-panel"
                aria-expanded={isExpanded}
              >
                nav item
              </button>
            </div>

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
      {isDesktop && isExpanded && (
        // TODO: replace with desktop nav
        <div id="expanded-panel" className={styles.headerPanelDesktop}>
          sub-navigation, search input
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
