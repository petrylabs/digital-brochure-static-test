import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../icons/SearchIcon";
import styles from "./SearchButton.module.scss";

/**
 * Search Input
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */

function SearchButton(props) {
  const { ariaControls, state, onClick } = props;

  return (
    // <div className={styles.searchButton}>
    <button
      type="button"
      onClick={() => onClick()}
      aria-controls={ariaControls}
      aria-expanded={state}
      className={styles.searchButton}
    >
      <SearchIcon width="16px" height="16px" />
    </button>
    // </div>
  );
}

SearchButton.propTypes = {
  ariaControls: PropTypes.string.isRequired,
  state: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

SearchButton.defaultProps = {
  onClick: () => {},
};

export default SearchButton;
