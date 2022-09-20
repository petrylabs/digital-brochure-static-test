import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { searchData } from "../../utils";
import styles from "./SearchResults.module.scss";

/**
 * SearchResults
 * Performs a search using provided search term and displays result as a list of links
 */
function SearchResults(props) {
  const { searchTerm, onResults } = props;

  const [searchResults, setSearchResults] = useState([]);

  /* Perform search as search term changes */
  useEffect(() => {
    const searchResultData = searchData(searchTerm);
    if (searchResultData) {
      setSearchResults(searchResultData.slice(0, 10));
    } else {
      setSearchResults([]);
    }
    onResults(searchResultData);
  }, [searchTerm, onResults]);

  /* Make search term bold within link text */
  const highlight = (title) => {
    let search = searchTerm;
    search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    var re = new RegExp(search, "g");
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
            {highlight(item.title)}
          </a>
        </li>
      ))}
    </ul>
  ) : null;
}

export default SearchResults;
