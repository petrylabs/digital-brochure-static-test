import { useState } from "react";

import SearchIcon from "../../icons/SearchIcon";
import SearchResults from "../SearchResults";
import styles from "./SearchInput.module.scss";
import useWindowWidth from "../../hooks/useWindowWidth";
import { breakpoints } from "../../config";
// import { Backdrop } from "@mui/material";

/**
 * SearchInput
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */
function SearchInput() {
  const screenWidth = useWindowWidth();
  const isDesktop = screenWidth >= breakpoints.lg;

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showResults}
      > */}
      <div className={styles.searchContainer}>
        {/* <div
            className={`${
              isDesktop && showResults
                ? styles.searchInputAreaWithResults
                : styles.searchInputArea
            }  `}
          >
            <div
              className={`${
                isDesktop
                  ? showResults
                    ? styles.searchWithResults
                    : styles.search
                  : styles.searchTablet
              }`}
            > */}
        <span className={styles.searchLogo}>
          <SearchIcon />
        </span>
        <input
          id="search"
          type="search"
          role="textbox"
          aria-autocomplete="both"
          aria-controls="search-listbox"
          // search-listbox is searchResult cmpt
          placeholder="Search"
          autoComplete="off"
          autoFocus
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <SearchResults searchTerm={searchTerm} isDesktop={isDesktop} />
        {/* </div>
          </div> */}
      </div>
      {/* </Backdrop> */}
    </>
  );
}

export default SearchInput;
