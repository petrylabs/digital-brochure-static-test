import { useEffect, useState } from "react";

import SearchIcon from "../../icons/SearchIcon";
import SearchResults from "../SearchResults";
import styles from "./SearchInput.module.scss";
import useWindowWidth from "../../hooks/useWindowWidth";
import { breakpoints } from "../../config";
import { searchData } from "../../utils";

/**
 * SearchInput
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */
function SearchInput({}) {
  const screenWidth = useWindowWidth();
  const isDesktop = screenWidth >= breakpoints.lg;
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const searchResultData = searchData(searchTerm);
      setSearchResult(searchResultData.slice(0, 10));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className={styles.searchContainer}>
      <div
        className={
          searchResult.length > 0
            ? styles.searchInputAreaWithResults
            : styles.searchInputArea
        }
      >
        <div
          className={`${
            isDesktop
              ? searchResult.length > 0
                ? styles.searchWithResults
                : styles.search
              : styles.searchTablet
          }`}
        >
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
          {searchResult.length > 0 && (
            <SearchResults
              results={searchResult}
              searchTerm={searchTerm}
              isDesktop={isDesktop}
            ></SearchResults>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
