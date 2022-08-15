import React from "react";
import styles from "./MobileNavBar.module.scss";
import { breakpoints } from "../../config";
import useWindowWidth from "../../hooks/useWindowWidth";
import NavCard from "../NavCard";
import Accordion from "../Accordion";
import PropTypes from "prop-types";

function MobileNavBar(props) {
  const { state, content } = props;
  const [isExpanded, setIsExpanded] = state;
  // create a state for on click on accordion menu
  var menuItems = Object.keys(content).map((key) => [
    key,
    content[key].order,
    content[key].subItems,
  ]);

  // Sort array based on order number in content
  const sortedMenuItems = menuItems.sort((a, b) => a[1] - b[1]);
  console.log(sortedMenuItems);

  /* Handling screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isTablet = screenWidth >= breakpoints.lg;

  return (
    <div
      id="mobile-nav"
      className={styles.headerPanelMobile}
      style={{ maxHeight: isExpanded ? `100vh` : `0px` }}
    >
      <div id="tablet-items-container">
        {sortedMenuItems.map((item, i) => (
          <>
            <div key={i} id={`tablet-tab-${i + 1}`}>
              {/* <div>{item[0]}</div> */}

              <Accordion
                id={"1"}
                summary={item[0]}
                expanded={item[1] < 2 ? true : false}
                details={
                  <div id={`tablet-tab-${i + 1}-items`}>
                    <div className={styles.tabletColumn}></div>
                    <div className={styles.tabletColumn}></div>
                    <div className={styles.mobileColumn}>
                      {item[2].map(
                        (subItem, i) =>
                          !subItem.excludeInMobile && (
                            <NavCard
                              url={subItem.url}
                              mainText={subItem.header}
                              subText={subItem.subtext}
                              isNew={subItem.isNew ? "New!" : ""}
                            />
                          )
                      )}
                    </div>
                  </div>
                }
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

MobileNavBar.propTypes = {
  state: PropTypes.array.isRequired,
  content: PropTypes.object,
};

export default MobileNavBar;
