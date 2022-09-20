import React, { useState } from "react";
// import { Backdrop } from "@mui/material";

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
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showResults}
      > */}
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
      {/* </Backdrop> */}
    </>
  );
}

export default SearchInput;
