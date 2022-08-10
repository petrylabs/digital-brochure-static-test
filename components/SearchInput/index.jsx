import React, { useState } from "react";
import { breakpoints } from "../../config";
import useWindowWidth from "../../hooks/useWindowWidth";
import styles from "./SearchInput.module.scss";

/**
 * Search Input
 * Page header; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */

function SearchInput() {
  const [isExpanded, setIsExpanded] = useState(false);

  /* Handling screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isDesktop = screenWidth >= breakpoints.lg;

  return (
    <>
      <div>
        {isDesktop && (
          <div>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-controls="expanded-panel"
              aria-expanded={isExpanded}
            >
              <span className="iconSearch"></span>
            </button>
          </div>
        )}
      </div>

      {isDesktop && isExpanded && (
        <div className={styles.expandedPanel}>
          {/* arrow image here - tablet size */}
          <div className={styles.searchBox}>
            {/* search icon image here */}
            {/* create label here */}
            <input
              type="search"
              role="textbox"
              aria-autocomplete="both"
              placeholder="Search"
              autoComplete="off"
            />
          </div>
          {/* x button image here - desktop size */}
        </div>
      )}
    </>
  );
}

export default SearchInput;
