import parse from "html-react-parser";
import styles from "./SearchResults.module.scss";

/**
 * SearchInput
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */
function SearchResults({ results, searchTerm, isDesktop }) {
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

  return (
    <ul className={isDesktop ? styles.searchResult : styles.searchResultTablet}>
      {results.map((item, i) => (
        <li key={i} className={styles.searchResultItem}>
          <a href={item.url} className={styles.searchResultItemLink}>
            {highlight(item.title)}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
