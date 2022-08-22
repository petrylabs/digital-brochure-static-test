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
import SearchIcon from "../../icons/SearchIcon";
import ModalContext from "../../context/modal";

function MobileNavBar(props) {
  const { isExpanded, content, gaqButton, loginString, toggleLanguage } = props;

  var menuItems = Object.keys(content).map((key) => [
    key,
    content[key].order,
    content[key].subItems,
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
      id="side-nav"
      className={styles.sidePanel}
      style={{ maxHeight: isExpanded ? `100vh` : `0px` }}
    >
      <div id="nav-items-container" className={styles.navItemsContainer}>
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
                expandIcon={item[1] < 2 ? '' : <Chevron />}
                classes={{
                  root: styles.summaryNavitems,
                  expanded: styles.summaryExpandedNavitems,
                  expandIconWrapper: styles.summaryIconNavitems,
                }}
              >
                {item[0]}
              </AccordionSummary>
              <AccordionDetails id={`details${i + 1}`} classes={{ root: styles.detailsNavitems }}>
                {
                  <>
                    {!isMobile && (
                      <div id={`accordian-item-${i + 1}-items`} className={styles.itemsColumn}>
                        {item[2].map(
                          (subItem, j) => (
                            <NavCard
                              key={j}
                              url={subItem.url}
                              mainText={subItem.header}
                              subText={subItem.subtext}
                              isNew={subItem.isNew ? "New!" : ""}
                            />
                          )
                        )}
                      </div>
                    )}
                    {isMobile && (
                      <div d={`accordian-item-${i + 1}-items`}>
                        {item[2].map(
                          (subItem, j) =>
                            !subItem.excludeInMobile && (
                              <NavCard
                                key={j}
                                url={subItem.url}
                                mainText={subItem.header}
                                subText={subItem.subtext}
                                isNew={subItem.isNew ? "New!" : ""}
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
              <button
                type="button"
                className={styles.searchButton}
              >
                <SearchIcon />
              </button>
              {toggleLanguage === "Français" ? (
                <a href='' className={styles.sideNavActionsLink}>
                  Fr
                </a>
              ) :
                <a href='' className={styles.sideNavActionsLink}>
                  En
                </a>
              }
              <a href='https://secure.sonnet.ca/#/login?lang=en' className={styles.sideNavActionsLink} target="_self">
                {loginString}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer} key={1}>
          <button type="button" className={styles.buttonGaq} onClick={() => setIsQuoteModalOpen(true)}>
            {gaqButton}
          </button>
        </div>
      </div>
    </div >
  );
}

MobileNavBar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  content: PropTypes.object,
  gaqButton: PropTypes.string,
  loginString: PropTypes.string,
  toggleLanguage: PropTypes.string,
};

export default MobileNavBar;
