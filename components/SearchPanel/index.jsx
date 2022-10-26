import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import LanguageContext from "../../context/language";
import Chevron from "../../icons/Chevron";
import { searchData } from "../../utils";
import { getLanguageVariable } from "../../utils/languageVariable";
import highlight from "../../utils/highlight";
import SearchIcon from "../../icons/SearchIcon";
import styles from "./SearchPanel.module.scss";

/**
 * SearchPanel
 * Displays the search input and live results
 */
function SearchPanel(props) {
  const { isActive, setIsActive, onBackButton } = props;
  const { lang } = useContext(LanguageContext);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const hasResults = searchResults?.length > 0;

  /* Perform search as search term changes */
  useEffect(() => {
    const searchResultData = searchData(query, lang);
    if (searchResultData) {
      setSearchResults(searchResultData.slice(0, 10));
    } else {
      setSearchResults([]);
    }
    console.log(searchResults);
  }, [lang, query]);

  return isActive ? (
    <>
      {/* Overlay/Backdrop */}
      {/* TODO: Extract to own component */}
      {hasResults && (
        <div
          className={styles.backdrop}
          onClick={() => {
            setIsActive(false);
          }}
        />
      )}

      <div
        id="search-panel"
        className={`${styles.panel} ${
          hasResults ? styles.withResults : styles.noResults
        }`}
      >
        <div className={styles.top}>
          {/* back (close) button on mobile */}
          <button
            className={styles.chevronButton}
            onClick={() => onBackButton()}
          >
            <Chevron direction="left" size="25px" />
          </button>

          <div
            className={styles.inputContainer}
            role="combobox"
            aria-haspopup="listbox"
            aria-owns="global-search-combobox-listbox"
            aria-expanded={hasResults.toString()}
          >
            <SearchIcon />
            <input
              id="search"
              type="search"
              aria-autocomplete="both"
              aria-controls="search-listbox"
              placeholder={getLanguageVariable("header-Search", lang)}
              aria-labelledby={null}
              autoComplete="off"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        {hasResults ? (
          <ul className={styles.searchResults}>
            {searchResults.map((item, i) => (
              <li key={i} className={styles.searchResultItem}>
                <a href={item.url} className={styles.searchResultItemLink}>
                  {highlight(query, item.metaTitle || item.title)}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  ) : null;
}

SearchPanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
  //prop to go back to the submenu and not the main menu.
  onBackButton: PropTypes.func,
};

export default SearchPanel;
