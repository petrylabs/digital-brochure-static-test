import { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import PropTypes from "prop-types";

import { getSearchResults } from "../../utils";
import styles from "./SearchResults.module.scss";
import LanguageContext from "../../context/language";
import { useDebounce } from "../../hooks/useDebounce";
import { languageId, locales } from "../../config";

/**
 * SearchResults
 * Performs a search using provided search term and displays result as a list of links
 */
function SearchResults(props) {
  const { lang } = useContext(LanguageContext);
  const { searchTerm, onResults } = props;
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce(searchTerm);
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async (query, cb) => {
    const res = await getSearchResults(
      query,
      lang === locales.en ? languageId.en : languageId.fr
    );
    cb(res);
  };

  useEffect(() => {
    setDebouncedSearchTerm(searchTerm);
  }, [searchTerm, onResults]);

  useEffect(() => {
    fetchData(debouncedSearchTerm, (res) => {
      const { data, error } = res;
      if (data) {
        setSearchResults(data?.contentlets || []);
        onResults(data?.contentlets || []);
      }
    });
  }, [debouncedSearchTerm]);

  /* Make search term bold within link text */
  const highlight = (title) => {
    let search = searchTerm;
    search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    var re = new RegExp(search, "gi");
    if (search.length > 0) {
      return parse(title.replace(re, `<b>$&</b>`));
    } else {
      return title;
    }
  };

  return searchResults.length > 0 ? (
    <ul className={styles.searchResults}>
      {searchResults.map((item, i) => (
        <li key={i} className={styles.searchResultItem}>
          <a href={item.url} className={styles.searchResultItemLink}>
            {highlight(item.metaTitle || item.title)}
          </a>
        </li>
      ))}
    </ul>
  ) : null;
}

SearchResults.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onResults: PropTypes.func.isRequired,
};

export default SearchResults;
