import SearchIcon from "../../icons/SearchIcon";
import styles from "./SearchInput.module.scss";

/**
 * SearchInput
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */
function SearchInput() {
  return (
    <div className={styles.searchContainer}>
      <div id="desktopSearchInputArea" className={styles.searchInputArea}>
        <div className={styles.search}>
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
          />
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
