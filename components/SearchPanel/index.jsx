import React from "react";
// import { Backdrop } from "@mui/material";

import { breakpoints } from "../../config";
import useWindowWidth from "../../hooks/useWindowWidth";
import Chevron from "../../icons/Chevron";
import CloseIcon from "../../icons/CloseIcon";
import SearchInput from "../SearchInput";
import SearchResults from "../SearchResults";
import styles from "./SearchPanel.module.scss";

/**
 * SearchPanel
 * Displays the search input and live results
 */
function SearchPanel(props) {
  const { isActive, setIsActive } = props;

  /* Handle screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isDesktop = screenWidth >= breakpoints.lg;

  return isActive ? (
    <>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showResults}
      > */}
      <div
        id="search-panel"
        className={
          isDesktop ? styles.searchContainer : styles.tabletSearchContainer
        }
      >
        {/* INPUT */}
        <div
          className={
            isDesktop ? styles.searchPaneDesktop : styles.searchPaneTablet
          }
        >
          {!isDesktop && (
            <button
              className={styles.chevronButton}
              onClick={() => setIsActive(false)}
            >
              <Chevron direction="left" size="25px" />
            </button>
          )}

          <SearchInput />

          {isDesktop && (
            <button
              className={styles.closeButton}
              onClick={() => setIsActive(false)}
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* RESULTS> */}
        {/* <SearchResults /> */}
      </div>
      {/* </Backdrop> */}
    </>
  ) : null;
}

export default SearchPanel;
