import React from "react";

import SearchIcon from "../../icons/SearchIcon";
import styles from "./SearchInput.module.scss";

/**
 * SearchInput
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */
function SearchInput(props) {
  const { value, onChange } = props;

  return (
    <div className={styles.inputContainer}>
      <SearchIcon />
      <input
        id="search"
        type="search"
        aria-autocomplete="both"
        aria-controls="search-listbox"
        placeholder="Search"
        autoComplete="off"
        autoFocus
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchInput;
