import React, { useContext, useState, useRef, useEffect } from "react";

import { breakpoints } from "../../config";
import ModalContext from "../../context/modal";
import useWindowWidth from "../../hooks/useWindowWidth";
import useScrolledPast from "../../hooks/useScrolledPast";
import headerData from "../../site-data/header.preval";
import CTA from "../CTA";
import HamburgerButton from "../HamburgerButton";
import HomeLogoLink from "../HomeLogoLink";
import SkipNavLink from "../SkipNavLink";
import SearchInput from "../SearchInput";
import styles from "./Header.module.scss";

/**
 * Header
 * Page header; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179900955/Header
 */
function Header() {
  const content = headerData.data.headerMenu;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  /* Handling screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isTablet = screenWidth < breakpoints.lg;
  const isDesktop = screenWidth >= breakpoints.lg;
  const searchRef = useRef(null);

  /* Handling modal display: */
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  /* Handle scrolling: */
  const hasScrolled = useScrolledPast(150);

  useEffect(() => {
    function handler(e) {
      if (searchRef.current && e.path[1].id == "header-bar") {
        setIsSearchExpanded(true);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [isSearchExpanded]);

  return (
    <>
      <header
        className={styles.header}
        onMouseLeave={() => {
          if (isDesktop) setIsExpanded(false);
        }}
      >
        <SkipNavLink />
        {/* HEADER BAR ----------------------------------------------------------- */}
        <div id="header-bar" className={styles.headerBar}>
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
                  onMouseEnter={() => {
                    setIsExpanded(true);
                    setIsSearchExpanded(false);
                  }}
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
                  <>
                    <SearchInput
                      ariaControls="search-panel"
                      state={[
                        isSearchExpanded,
                        setIsSearchExpanded,
                        setIsExpanded,
                      ]}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* EXPANSION PANEL --------------------------------------------------------- */}
        {isDesktop && isExpanded && (
          // TODO: replace with desktop nav
          <div id="expanded-panel" className={styles.headerPanelDesktop}>
            sub-navigation, search input
          </div>
        )}

        {/* EXPANSION PANEl FOR SEARCH PANE ----------------------------------------- */}
        {isSearchExpanded && (
          <div
            id="search-panel"
            ref={searchRef}
            className={styles.searchPanelDesktop}
          >
            {/* arrow image here - tablet size */}
            {isTablet && (
              <span onClick={() => setIsSearchExpanded(false)}>&#60;</span>
            )}
            <div className={styles.searchInputArea}>
              <span className={styles.searchIcon}>S</span>
              {/* create label here */}
              <input
                id="search"
                type="search"
                role="textbox"
                aria-autocomplete="both"
                aria-controls="search-listbox"
                // search-listbox is searchResult cmpt
                placeholder="Search"
                autoComplete="off"
              />
            </div>
            {/* x button image here - desktop size */}
            {isDesktop && (
              <span onClick={() => setIsSearchExpanded(false)}> x </span>
            )}
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
            <SearchInput state={[isExpanded, setIsExpanded]} />
          </div>
        )}
      </header>
      {isSearchExpanded && (
        <div
          id="backdrop"
          className={styles.backdrop}
          onClick={() => {
            setIsSearchExpanded(false);
          }}
        ></div>
      )}
    </>
  );
}

export default Header;
