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
import SearchButton from "../SearchButton";
import SearchIcon from "../../icons/SearchIcon";
import CloseIcon from "../../icons/CloseIcon";
import Chevron from "../../icons/Chevron";
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
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  /* Handling screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isDesktop = screenWidth >= breakpoints.lg;
  const isTablet = !isMobile && !isDesktop;

  /* Handling modal display: */
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  /* Handle scrolling: */
  const hasScrolled = useScrolledPast(150);
  const menuHandler = () => {
    setIsExpanded(true);
    setIsSearchExpanded(false);
  };

  const deskTopSearchButton = () => {
    setIsSearchExpanded(!isSearchExpanded); // button can on/off for search pane
    setIsExpanded(false); // for nav items
  };

  const mobileSearchButton = () => {
    setIsMobileSearchExpanded(!isMobileSearchExpanded);
    setIsExpanded(false); // for nav items
  };

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
        {!isMobileSearchExpanded ? (
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
                    onMouseEnter={menuHandler}
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
                    <CTA
                      type="primary"
                      onClick={() => setIsQuoteModalOpen(true)}
                    >
                      {content.gaq}
                    </CTA>
                  ) : (
                    <>
                      <SearchButton
                        ariaControls="search-panel"
                        state={isSearchExpanded}
                        onClick={deskTopSearchButton}
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div id="tablet-search-bar" className={styles.tabletSearchContainer}>
            <div className={styles.searchPaneTablet}>
              {!isDesktop && (
                <button
                  className={styles.chevronButton}
                  onClick={() => setIsMobileSearchExpanded(false)}
                >
                  <Chevron direction="left" size="25px" />
                </button>
              )}
              <div className={styles.SearchContainer}>
                <div className={styles.searchInputArea} tabIndex="0">
                  <div className={styles.search}>
                    <span className={styles.searchLogo}>
                      <SearchIcon />
                    </span>
                    <input
                      id="search"
                      type="search"
                      role="textbox"
                      aria-autocomplete="both"
                      aria-controls="search-listbox"
                      // search-listbox is searchResult cmpt
                      placeholder="Search"
                      autoComplete="off"
                      autoFocus
                    />
                  </div>
                </div>
              </div>
              {isDesktop && (
                <button
                  className={styles.closeButton}
                  onClick={() => setIsMobileSearchExpanded(false)}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>
        )}

        {/* EXPANSION PANEL --------------------------------------------------------- */}
        {isDesktop && isExpanded && (
          // TODO: replace with desktop nav
          <div id="expanded-panel" className={styles.headerPanelDesktop}>
            sub-navigation, search input
          </div>
        )}

        {/* EXPANSION PANEl FOR SEARCH PANE ----------------------------------------- */}
        {isSearchExpanded && (
          <div id="search-panel" className={styles.searchPaneDesktop}>
            {isTablet && (
              <button
                className={styles.chevronButton}
                onClick={() => setIsSearchExpanded(false)}
              >
                <Chevron direction="left" size="25px" />
              </button>
            )}
            <div className={styles.SearchContainer}>
              <div
                id="desktopSearchInputArea"
                className={styles.searchInputArea}
              >
                <div className={styles.search}>
                  <span className={styles.searchLogo}>
                    <SearchIcon />
                  </span>
                  <input
                    id="search"
                    type="search"
                    role="textbox"
                    aria-autocomplete="both"
                    aria-controls="search-listbox"
                    // search-listbox is searchResult cmpt
                    placeholder="Search"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
              </div>
            </div>
            {isDesktop && (
              <button
                className={styles.closeButton}
                onClick={() => setIsSearchExpanded(false)}
              >
                <CloseIcon />
              </button>
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
            <SearchButton
              ariaControls="tablet-search-bar"
              state={isMobileSearchExpanded}
              onClick={mobileSearchButton}
            />
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
