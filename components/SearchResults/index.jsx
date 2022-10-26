import { useContext, useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";

import { searchData } from "../../utils";
import highlight from "../../utils/highlight";
import useKeyPress from "../../hooks/useKeyPress";
import styles from "./SearchResults.module.scss";
import LanguageContext from "../../context/language";

/**
 * SearchResults
 * Performs a search using provided search term and displays result as a list of links
 */
function SearchResults(props) {
  const { lang } = useContext(LanguageContext);
  const { searchTerm, onResults, onQueryChange } = props;
  const [searchResults, setSearchResults] = useState([]);

  /* Perform search as search term changes */
  useEffect(() => {
    const searchResultData = searchData(searchTerm, lang);
    if (searchResultData) {
      setSearchResults(searchResultData.slice(0, 10));
    } else {
      setSearchResults([]);
    }
    console.log(searchResults);
    onResults(searchResultData);
  }, [lang, searchTerm, onResults]);

  return searchResults.length > 0 ? (
    <ul
      id="global-search-combobox-listbox"
      role="listbox"
      className={styles.searchResults}
    >
      {searchResults.map((item, i) => (
        <li role="option" key={i} className={styles.searchResultItem}>
          <a href={item.url} className={styles.searchResultItemLink}>
            {highlight(searchTerm, item.metaTitle || item.title)}
          </a>
        </li>
      ))}
    </ul>
  ) : null;
}

SearchResults.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onResults: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};

export default SearchResults;
