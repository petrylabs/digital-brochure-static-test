import React, { useContext, useEffect, useState } from "react";
import loadable from "@loadable/component";

import { breakpoints } from "../../config";
import ModalContext from "../../context/modal";
import useWindowWidth from "../../hooks/useWindowWidth";
import useScrolledPast from "../../hooks/useScrolledPast";
import CloseIcon from "../../icons/CloseIcon";
import headerData from "../../site-data/header.preval";
import CTA from "../CTA";
import HamburgerButton from "../HamburgerButton";
import HomeLogoLink from "../HomeLogoLink";
import SkipNavLink from "../SkipNavLink";
import NavMobile from "../NavMobile";
import NavDesktop from "../NavDesktop";
import CartLink from "../CartLink";
import NavSecondary from "../NavSecondary";
import styles from "./Header.module.scss";
import LanguageContext from "../../context/language";

const SearchPanel = loadable(() => import("../SearchPanel"));

/**
 * Header
 * Page header; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179900955/Header
 */
function Header(props) {
  const { banners, lockPageScroll } = props;
  const { lang } = useContext(LanguageContext);
  const content = headerData[lang]?.headerMenu;

  /* Handle panel expansion: */
  const [isSubmenuExpanded, setIsSubmenuExpanded] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const handleSubmenu = () => {
    setIsSubmenuExpanded(true);
    setIsSearchExpanded(false);
  };

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  /* Handle screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isDesktop = screenWidth >= breakpoints.lg;

  /* Handle modal display: */
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  /* Handle scrolling: */
  const hasScrolled = useScrolledPast(150);

  const deskTopSearchButton = () => {
    setIsSearchExpanded(!isSearchExpanded); // button can on/off for search pane
    setIsSubmenuExpanded(false); // for nav items
  };
  const mobileSearchButton = () => {
    setIsMobileSearchExpanded(!isMobileSearchExpanded);
    setIsSubmenuExpanded(false); // for nav items
  };

  /* Close search on layout change: */
  useEffect(() => {
    if (isDesktop) {
      setIsMobileSearchExpanded(false);
    } else {
      setIsSearchExpanded(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if ((!isDesktop && isSubmenuExpanded) || isMobileSearchExpanded) {
      lockPageScroll(true);
    } else {
      lockPageScroll(false);
    }
  });

  if (content)
    return (
      <>
        <header
          className={styles.header}
          onMouseLeave={() => {
            if (isDesktop) setIsSubmenuExpanded(false);
          }}
        >
          {banners}
          <SkipNavLink />

          {/* HEADER BAR ----------------------------------------------------------- */}
          {!isMobileSearchExpanded ? (
            <div id="header-bar" className={styles.headerBar}>
              <HomeLogoLink />

              {/* MOBILE NAV */}
              <div className={styles.navMobile}>
                {!isSubmenuExpanded && (
                  <CTA
                    type="primary"
                    small={isMobile}
                    onClick={() => setIsQuoteModalOpen(true)}
                    buttonId={content?.getAQuoteId}
                  >
                    {isMobile ? content.gaqSmall : content.gaq}
                  </CTA>
                )}
                <HamburgerButton
                  ariaControls="mobile-nav"
                  state={[isSubmenuExpanded, setIsSubmenuExpanded]}
                />
              </div>

              <NavDesktop
                isExpanded={isSubmenuExpanded}
                setIsExpanded={handleSubmenu}
                setPanelHeight={setPanelHeight}
              />

              {/* Secondary Nav */}
              <div className={styles.secondaryNav}>
                {hasScrolled ? (
                  <CTA
                    type="primary"
                    onClick={() => setIsQuoteModalOpen(true)}
                    buttonId={content?.primaryButtonId}
                  >
                    {content.gaq}
                  </CTA>
                ) : (
                  <div className={styles.secondaryNavContainer}>
                    <NavSecondary searchToggleFn={deskTopSearchButton} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            // TODO: move this out of header bar
            <SearchPanel
              id={content?.searchId}
              isActive={isMobileSearchExpanded}
              setIsActive={setIsMobileSearchExpanded}
              onBackButton={() => {
                setIsMobileSearchExpanded(false);
                setIsSubmenuExpanded(true);
              }}
            />
          )}

          {/* EXPANSION PANEL ----------------------------------------------------------- */}
          {/* Desktop submenu; positioned absolutely, so this (empty) panel expands to match its height */}
          {isDesktop && isSubmenuExpanded && (
            <div
              className={styles.headerPanelDesktop}
              style={{ height: panelHeight }}
            />
          )}

          {/* Search */}
          {isDesktop && isSearchExpanded && (
            <div className={styles.searchPanel}>
              <SearchPanel
                isActive={isSearchExpanded}
                setIsActive={setIsSearchExpanded}
              />
              <button
                className={styles.closeButton}
                onClick={() => setIsSearchExpanded(false)}
              >
                <CloseIcon />
              </button>
            </div>
          )}

          {/* Mobile submenu */}
          {!isDesktop && (
            <NavMobile
              isExpanded={isSubmenuExpanded}
              content={content}
              ariaControls="search-panel"
              isSearchExpanded={isMobileSearchExpanded}
              onClick={mobileSearchButton}
            />
          )}
        </header>

        {/* Overlay/Backdrop */}
        {/* TODO: Extract to own component */}
        {isDesktop && isSearchExpanded && (
          <div
            className={styles.backdrop}
            onClick={() => {
              setIsSearchExpanded(false);
            }}
          />
        )}
      </>
    );

  return null;
}

export default Header;
