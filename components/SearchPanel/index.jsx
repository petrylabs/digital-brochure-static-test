import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import LanguageContext from "../../context/language";
import Chevron from "../../icons/Chevron";
import { searchData } from "../../utils";
import { getLanguageVariable } from "../../utils/languageVariable";
import highlight from "../../utils/highlight";
import SearchIcon from "../../icons/SearchIcon";
import styles from "./SearchPanel.module.scss";
import { Autocomplete } from "@mui/material";

/**
 * SearchPanel
 * Displays the search input and live results
 */
function SearchPanel(props) {
  const { isActive, setIsActive, onBackButton } = props;
  const { lang } = useContext(LanguageContext);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  /* Perform search as search term changes */
  useEffect(() => {
    const searchResultData = searchData(query, lang);
    if (searchResultData) {
      setSearchResults(searchResultData.slice(0, 10));
    } else {
      setSearchResults([]);
    }
    setShowResults(searchResults?.length > 0);
  }, [lang, query, searchResults]);

  return isActive ? (
    <>
      {/* Overlay/Backdrop */}
      {/* TODO: Extract to own component */}
      {showResults && (
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
          showResults ? styles.withResults : styles.noResults
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

          <Autocomplete
            autoComplete
            freeSolo
            fullWidth
            includeInputInList
            inputValue={query}
            onInputChange={(event) => setQuery(event?.target.value)}
            onChange={(event, option) => (window.location.href = option.url)}
            renderInput={(params) => (
              <div
                ref={params.InputProps.ref}
                className={styles.inputContainer}
              >
                <SearchIcon />
                <input
                  {...params.inputProps}
                  id="search"
                  type="search"
                  placeholder={getLanguageVariable("header-Search", lang)}
                  aria-label={getLanguageVariable("header-Search", lang)}
                  autoFocus
                />
              </div>
            )}
            options={searchResults}
            limit={10}
            getOptionLabel={(option) => option.metaTitle || option.title}
            renderOption={(props, option) => (
              <li className={styles.searchResultItem} {...props}>
                <a href={option.url} className={styles.searchResultItemLink}>
                  {highlight(query, option.metaTitle || option.title)}
                </a>
              </li>
            )}
            onClose={(event, reason) => {
              if (reason === "escape" || reason === "blur") {
                setShowResults(false);
              }
            }}
          />
        </div>

        {/* {showResults ? (
          <ul className={styles.searchResults}>
            {searchResults.map((item, i) => (
              <li key={i} className={styles.searchResultItem}>
                <a href={item.url} className={styles.searchResultItemLink}>
                  {highlight(query, item.metaTitle || item.title)}
                </a>
              </li>
            ))}
          </ul>
        ) : null} */}
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
