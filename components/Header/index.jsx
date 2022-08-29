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
import MobileNavBar from "../MobileNavBar";
import NavDesktop from "../NavDesktop";
import styles from "./Header.module.scss";
import CartLink from "../CartLink";
import SearchInput from "../SearchInput";

/**
 * Header
 * Page header; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179900955/Header
 */
function Header() {
  const content = headerData.data.headerMenu;

  /* Handle panel expansion: */
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);

  /* Handle screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isDesktop = screenWidth >= breakpoints.lg;
  const isTablet = !isMobile && !isDesktop;

  /* Handle modal display: */
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
                <NavDesktop
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  setPanelHeight={setPanelHeight}
                />

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
                      <CartLink />
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

              <SearchInput />
            </div>
          </div>
        )}

        {/* EXPANSION PANEL ----------------------------------------------------------- */}
        {isDesktop && isExpanded && (
          <div
            className={styles.headerPanelDesktop}
            style={{ height: panelHeight }}
          >
            {/* Desktop submenu is positioned absolutely, so this (empty) panel expands to match its height */}
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
            <SearchInput />

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
          <MobileNavBar
            isExpanded={isExpanded}
            content={content}
            ariaControls="tablet-search-bar"
            isSearchExpanded={isMobileSearchExpanded}
            onClick={mobileSearchButton}
          />
        )}
      </header>

      {/* Overlay/Backdrop */}
      {isSearchExpanded && (
        <div
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
