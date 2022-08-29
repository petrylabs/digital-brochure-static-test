import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../icons/SearchIcon";
import styles from "./SearchButton.module.scss";

/**
 * Search Button
 */

function SearchButton(props) {
  const { ariaControls, state, onClick } = props;

  return (
    <button
      type="button"
      onClick={() => onClick()}
      aria-controls={ariaControls}
      aria-expanded={state}
      className={styles.searchButton}
    >
      <SearchIcon width="16px" height="16px" />
    </button>
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
