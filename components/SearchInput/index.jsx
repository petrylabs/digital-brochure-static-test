import React from "react";
import { breakpoints } from "../../config";
import { array, string } from "prop-types";
import useWindowWidth from "../../hooks/useWindowWidth";
import styles from "./SearchInput.module.scss";

/**
 * Search Input
 * Page header; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */

function SearchInput(props) {
  const { ariaControls, state } = props;
  const [isExpanded, setIsExpanded, isMenuExpanded, setIsMenuExpanded] = state;

  return (
    <>
      {/* search button */}
      <div className={styles.searchButton}>
        <button
          type="button"
          onClick={() => {
            setIsExpanded(!isExpanded);
            setIsMenuExpanded(false);
          }}
          aria-controls={ariaControls}
          aria-expanded={isExpanded}
        >
          <span className="icon-font iconNavSearch"></span>
        </button>
      </div>
    </>
  );
}

SearchInput.propTypes = {
  ariaControls: string.isRequired,
  state: array.isRequired,
};

export default SearchInput;
