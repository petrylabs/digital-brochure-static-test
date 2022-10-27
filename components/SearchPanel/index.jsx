import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Autocomplete } from "@mui/material";

import { languageId, locales } from "../../config";
import LanguageContext from "../../context/language";
import SearchIcon from "../../icons/SearchIcon";
import Chevron from "../../icons/Chevron";
import { getSearchResults } from "../../utils";
import highlight from "../../utils/highlight";
import { getLanguageVariable } from "../../utils/languageVariable";
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
  const [showResults, setShowResults] = useState(false);

  /* Perform search as search term changes */
  useEffect(() => {
    const fetchData = async (searchTerm, cb) => {
      const res = await getSearchResults(
        searchTerm,
        lang === locales.fr ? languageId.fr : languageId.en
      );
      cb(res);
    };
    fetchData(query, (res) => {
      const { data, error } = res;
      if (data) {
        setSearchResults(data?.contentlets || []);
        setShowResults(data?.contentlets?.length > 0);
      }
    });
  }, [query, lang]);

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
        <Autocomplete
          autoComplete
          freeSolo
          fullWidth
          includeInputInList
          inputValue={query}
          onInputChange={(event) => setQuery(event?.target.value)}
          onChange={(event, option) => (window.location.href = option.url)}
          renderInput={(params) => (
            <div className={styles.top}>
              {/* back (close) button on mobile */}
              <button
                className={styles.chevronButton}
                onClick={() => onBackButton()}
              >
                <Chevron direction="left" size="25px" />
              </button>
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
            </div>
          )}
          disablePortal
          PopperComponent={({ children }) => (
            <div className={styles.searchResultsContainer}>{children}</div>
          )}
          options={searchResults}
          limit={10}
          getOptionLabel={(option) => option.metaTitle || option.title}
          renderOption={(props, option) => (
            <li {...props} className={styles.searchResultItem}>
              <a href={option.url}>
                {highlight(query, option.metaTitle || option.title)}
              </a>
            </li>
          )}
          onOpen={() => setShowResults(true)}
          onClose={(event, reason) => {
            if (reason === "escape" || reason === "blur") {
              setShowResults(false);
            }
          }}
          classes={{
            root: styles.autocompleteRoot,
            paper: styles.autocompletePaper,
            listbox: styles.searchResults,
          }}
        />
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
