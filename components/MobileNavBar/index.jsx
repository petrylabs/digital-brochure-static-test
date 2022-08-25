import React, { useContext } from "react";
import styles from "./MobileNavBar.module.scss";
import { breakpoints } from "../../config";
import useWindowWidth from "../../hooks/useWindowWidth";
import NavCard from "../NavCard";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import PropTypes from "prop-types";
import Chevron from "../../icons/Chevron";
import SearchButton from "../SearchButton";
import ModalContext from "../../context/modal";

function MobileNavBar(props) {
  const { isExpanded, content, ariaControls, isSearchExpanded, onClick } =
    props;

  var menuItems = Object.keys(content.menuItems).map((key) => [
    key,
    content.menuItems[key].order,
    content.menuItems[key].subItems,
  ]);

  // Sort array based on order number in content
  const sortedMenuItems = menuItems.sort((a, b) => a[1] - b[1]);

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
        {sortedMenuItems.map((item, i) => (
          <div key={i}>
            <MuiAccordion
              id={`accordian-item-${i + 1}`}
              defaultExpanded={item[1] < 2 ? true : false}
              disableGutters
              TransitionProps={{ timeout: 0 }}
              classes={{ root: styles.accordionNavitems }}
            >
              <AccordionSummary
                id={`summary${i + 1}`}
                expandIcon={item[1] < 2 ? "" : <Chevron />}
                classes={{
                  root: styles.summaryNavitems,
                  expanded: styles.summaryExpandedNavitems,
                  expandIconWrapper: styles.summaryIconNavitems,
                }}
              >
                {item[0]}
              </AccordionSummary>
              <AccordionDetails
                id={`details${i + 1}`}
                classes={{ root: styles.detailsNavitems }}
              >
                {
                  <>
                    {!isMobile && (
                      <div className={styles.itemsColumn}>
                        {item[2].map((subItem, j) => (
                          <NavCard
                            key={j}
                            url={subItem.url}
                            mainText={subItem.header}
                            subText={subItem.subtext}
                            isNew={subItem.isNew}
                          />
                        ))}
                      </div>
                    )}
                    {isMobile && (
                      <div className={styles.mobileDetails}>
                        {item[2].map(
                          (subItem, j) =>
                            !subItem.excludeInMobile && (
                              <NavCard
                                key={j}
                                url={subItem.url}
                                mainText={subItem.header}
                                subText={subItem.subtext}
                                isNew={subItem.isNew}
                              />
                            )
                        )}
                      </div>
                    )}
                  </>
                }
              </AccordionDetails>
            </MuiAccordion>
          </div>
        ))}

        <div className={styles.buttonContentContainer}>
          <div className={styles.actionsNav}>
            <div className={styles.actionNavitems}>
              <button type="button" className={styles.searchButton}>
                {/* <SearchIcon /> */}
                <SearchButton
                  ariaControls={ariaControls}
                  state={isSearchExpanded}
                  onClick={onClick}
                />
              </button>
              {content.toggleLanguage === "Français" ? (
                <a href="" className={styles.sideNavActionsLink}>
                  Fr
                </a>
              ) : (
                <a href="" className={styles.sideNavActionsLink}>
                  En
                </a>
              )}
              <a
                href={content.loginLink}
                className={styles.sideNavActionsLink}
                target="_self"
              >
                {content.loginStr}
              </a>
            </div>
          </div>
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

MobileNavBar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  content: PropTypes.object.isRequired,
  ariaControls: PropTypes.string.isRequired,
  isSearchExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MobileNavBar;
