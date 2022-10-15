import { useContext, useEffect, useReducer, useState } from "react";
import parse from "html-react-parser";
import PropTypes from "prop-types";

import { searchData } from "../../utils";
import styles from "./SearchResults.module.scss";
import LanguageContext from "../../context/language";
import { red } from "@mui/material/colors";

const initialState = { selectedIndex: 0 };

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);
  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);
  return keyPressed;
};

/**
 * SearchResults
 * Performs a search using provided search term and displays result as a list of links
 */
function SearchResults(props) {
  const { lang } = useContext(LanguageContext);
  const { searchTerm, onResults, onQueryChange } = props;
  const [searchResults, setSearchResults] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');

  function reducer (state, action) {
    // NOTE: Commented code helps replace searchInput when user navigates search
    // results via arrow keys but needs to be placed elsewhere.
    // if (searchResults[state.selectedIndex]) {
    //   onQueryChange(searchResults[state.selectedIndex].title);
    // }
    switch (action.type) {
      case "arrowUp":
        return {
          selectedIndex: state.selectedIndex !== 0 ? state.selectedIndex - 1 : 0
        };
      case "arrowDown":
        return {
          selectedIndex: state.selectedIndex !== searchResults.length - 1 ? state.selectedIndex + 1 : 0
        };
      case "select":
        return { selectedIndex: action.payload };
      default:
        throw new Error();
    }
  }

  /* Perform search as search term changes */
  useEffect(() => {
    const searchResultData = searchData(searchTerm, lang);
    if (searchResultData) {
      setSearchResults(searchResultData.slice(0, 10));
    } else {
      setSearchResults([]);
    }
    onResults(searchResultData);
  }, [lang, searchTerm, onResults]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: 'arrowDown' });
    }
  }, [arrowDownPressed, searchResults]);

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: 'arrowUp' });
    }
  }, [arrowUpPressed, searchResults]);

  /* Make search term bold within link text */
  const highlight = (title) => {
    let search = searchTerm;
    if (typeof search == 'string') {
      search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
      var re = new RegExp(search, "gi");
      if (search.length > 0) {
        return parse(title.replace(re, `<b>$&</b>`));
      } else {
        return title;
      }
    }
  };

  return searchResults.length > 0 ? (
    <ul id="global-search-combobox-listbox" role="listbox" className={styles.searchResults}>
      {searchResults.map((item, i) => (
        <li
          role="option"
          key={i}
          className={styles.searchResultItem}
          aria-selected={i == state.selectedIndex}
          onClick={() => {
            dispatch({ type: "select", payload: i });
          }}
          onKeyPress={reducer}
          style={{
            cursor: "pointer",
          }}
        >
          <a
            href={item.url} 
            className={ `${styles.searchResultItemLink} ${i === state.selectedIndex ? styles.searchResultHoveredItem : styles.searchResultItem}`}
          >
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
  onQueryChange: PropTypes.func.isRequired,
};

export default SearchResults;
