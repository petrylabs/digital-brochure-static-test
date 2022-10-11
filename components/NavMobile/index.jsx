import React, { useContext } from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import PropTypes from "prop-types";

import { breakpoints } from "../../config";
import ModalContext from "../../context/modal";
import useWindowWidth from "../../hooks/useWindowWidth";
import Chevron from "../../icons/Chevron";
import headerData from "../../site-data/header.preval";
import getNavigation from "../../utils/navigation";
import NavCard from "../NavCard";
import styles from "./NavMobile.module.scss";
import NavSecondary from "../NavSecondary";
import LanguageContext from "../../context/language";

/**
 * NavMobile
 * Header navigation for mobile & tablet screen widths
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179081764/NavMobile
 */
function NavMobile(props) {
  const { isExpanded, ariaControls, isSearchExpanded, onClick } = props;
  const { lang } = useContext(LanguageContext);
  const content = headerData.data.headerMenu;
  const navItems = getNavigation(lang);

  /* Handling screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;

  /* Handling modal display: */
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  return (
    <div
      className={styles.container}
      style={{ maxHeight: isExpanded ? `100vh` : `0px` }}
    >
      <nav className={styles.nav}>
        {navItems.map((item, i) => (
          <MuiAccordion
            key={i}
            id={`accordian-item-${i + 1}`}
            defaultExpanded={i < 2}
            disableGutters
            elevation={0}
            TransitionProps={{ timeout: 0 }}
            classes={{ root: styles.accordionRoot }}
          >
            <AccordionSummary
              id={`summary${i + 1}`}
              expandIcon={i < 2 ? "" : <Chevron />}
              classes={{
                root: styles.summary,
                expanded: styles.summaryExpanded,
                expandIconWrapper: styles.summaryIcon,
              }}
            >
              {item.menuItem}
            </AccordionSummary>

            <AccordionDetails
              id={`details${i + 1}`}
              classes={{ root: styles.details }}
            >
              <ul
                className={`${styles.subItemsList} ${
                  isMobile ? styles.mobileDetails : styles.itemsColumn
                }`}
              >
                {item.subItems.map((subItem, j) => {
                  return isMobile && subItem.excludeInMobile ? null : (
                    <li key={j}>
                      <NavCard
                        url={subItem.url}
                        mainText={subItem.header}
                        subText={subItem.subtext}
                        isNew={subItem.isNew}
                      />
                    </li>
                  );
                })}
              </ul>
            </AccordionDetails>
          </MuiAccordion>
        ))}

        <div className={styles.secondaryNavContainer}>
          <NavSecondary
            ariaControls={ariaControls}
            ariaExpanded={isSearchExpanded}
            searchToggleFn={onClick}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.buttonGaq}
            onClick={() => setIsQuoteModalOpen(true)}
          >
            {content.gaq}
          </button>
        </div>
      </nav>
    </div>
  );
}

NavMobile.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  content: PropTypes.object.isRequired,
  ariaControls: PropTypes.string.isRequired,
  isSearchExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NavMobile;
