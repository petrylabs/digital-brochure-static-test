import React, { useContext, useState } from "react";

import { breakpoints } from "../../config";
import ModalContext from "../../context/modal";
import useWindowWidth from "../../hooks/useWindowWidth";
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
  const [isExpanded, setIsExpanded] = useState(false);

  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isDesktop = screenWidth >= breakpoints.lg;

  const { setIsQuoteModalOpen } = useContext(ModalContext);

  return (
    <header
      className={styles.header}
      onMouseLeave={() => {
        if (isDesktop) setIsExpanded(false);
      }}
    >
      <SkipNavLink />

      {/* HEADER BAR */}
      <div className={styles.headerBar}>
        <HomeLogoLink />

        {!isDesktop && (
          <div className={styles.mobileNavbar}>
            <CTA
              type="primary"
              small={isMobile}
              onClick={() => setIsQuoteModalOpen(true)}
            >
              {isMobile ? "Quote" : "Get a Quote"}
            </CTA>
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
            <div>extra links here</div>
          </>
        )}
      </div>

      {/* EXPANSION PANEL */}
      {isExpanded && (
        <div
          id="expanded-panel"
          className={`${
            isDesktop ? styles.headerPanelDesktop : styles.headerPanelMobile
          }`}
        >
          {isDesktop ? (
            <>sub-navigation, search input</>
          ) : (
            <div id="mobile-nav">mobile nav</div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
