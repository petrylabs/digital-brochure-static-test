import React from "react";
import { array, string } from "prop-types";
import styles from "./SearchButton.module.scss";

/**
 * Search Input
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */

function SearchButton(props) {
  const { ariaControls, state } = props;
  const [isSearchExpanded, setIsSearchExpanded, setIsMenuExpanded] = state;

  return (
    <button
      type="button"
      onClick={() => {
        setIsSearchExpanded(!isSearchExpanded);
        setIsMenuExpanded(false);
      }}
      aria-controls={ariaControls}
      aria-expanded={isSearchExpanded}
      className={`${styles.searchButton} ${
        isSearchExpanded ? "is-active" : ""
      }`}
    >
      <span>S</span>
    </button>
  );
}

SearchButton.propTypes = {
  ariaControls: string.isRequired,
  state: array.isRequired,
};

export default SearchButton;
