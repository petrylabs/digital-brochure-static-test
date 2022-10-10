import React, { Fragment, useContext } from "react";
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
import { evenIndexBeforeOdd } from "../../utils/array";
import NavCard from "../NavCard";
import styles from "./NavMobile.module.scss";
import NavSecondary from "../NavSecondary";

/**
 * NavMobile
 * Header navigation for mobile & tablet screen widths
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179081764/NavMobile
 */
function NavMobile(props) {
  const { isExpanded, ariaControls, isSearchExpanded, onClick } = props;
  /* Restructure content: */
  const content = headerData.data.headerMenu;
  const navItems = Object.entries(content?.menuItems)
    .sort((a, b) => a[1].order - b[1].order) // re-order by `order` property
    .map((item) => {
      return {
        menuItem: item[0],
        ...item[1],
        subItems: evenIndexBeforeOdd(item[1].subItems), // reorder by column
      };
    });

  /* Handling screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;

  /* Handling modal display: */
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  return (
    <div
      className={styles.mobileTabletNavBar}
      style={{ maxHeight: isExpanded ? `100vh` : `0px` }}
    >
      <nav className={styles.navItemsContainer}>
        {navItems.map((item, i) => (
          <MuiAccordion
            key={i}
            id={`accordian-item-${i + 1}`}
            defaultExpanded={i < 2}
            disableGutters
            TransitionProps={{ timeout: 0 }}
            classes={{ root: styles.accordionNavitems }}
          >
            <AccordionSummary
              id={`summary${i + 1}`}
              expandIcon={i < 2 ? "" : <Chevron />}
              classes={{
                root: styles.summaryNavitems,
                expanded: styles.summaryExpandedNavitems,
                expandIconWrapper: styles.summaryIconNavitems,
              }}
            >
              {item.menuItem}
            </AccordionSummary>

            <AccordionDetails
              id={`details${i + 1}`}
              classes={{ root: styles.detailsNavitems }}
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

        <div className={styles.buttonContentContainer}>
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
