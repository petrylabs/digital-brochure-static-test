import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import LanguageContext from "../../context/language";
import Chevron from "../../icons/Chevron";
import { searchData } from "../../utils";
import highlight from "../../utils/highlight";
import SearchInput from "../SearchInput";
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
  const [hasResults, setHasResults] = useState(false);

  /* Perform search as search term changes */
  useEffect(() => {
    const searchResultData = searchData(query, lang);
    if (searchResultData) {
      setSearchResults(searchResultData.slice(0, 10));
    } else {
      setSearchResults([]);
    }
    console.log(searchResults);
    setHasResults(searchResultData?.length > 0);
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

          <SearchInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            hasResults={hasResults}
          />
        </div>

        {/* <SearchResults
          onResults={(results) => setHasResults(results?.length > 0)}
          onQueryChange={(newQuery) => setQuery(newQuery)}
        /> */}
        {searchResults.length > 0 ? (
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
