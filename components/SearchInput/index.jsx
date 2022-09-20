import React, { useState } from "react";

import SearchIcon from "../../icons/SearchIcon";
import SearchResults from "../SearchResults";
import styles from "./SearchInput.module.scss";

/**
 * SearchInput
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */
function SearchInput(props) {
  const { value, onChange } = props;
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
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

      {/* <SearchResults searchTerm={searchTerm} /> */}
    </>
  );
}

export default SearchInput;
