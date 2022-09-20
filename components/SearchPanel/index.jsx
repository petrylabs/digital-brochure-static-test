import { useState } from "react";
import Chevron from "../../icons/Chevron";
import SearchInput from "../SearchInput";
import SearchResults from "../SearchResults";
import styles from "./SearchPanel.module.scss";

/**
 * SearchPanel
 * Displays the search input and live results
 */
function SearchPanel(props) {
  const { isActive, setIsActive } = props;
  const [query, setQuery] = useState("");
  const [hasResults, setHasResults] = useState(false);

  return isActive ? (
    <>
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
            onClick={() => setIsActive(false)}
          >
            <Chevron direction="left" size="25px" />
          </button>

          <SearchInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <SearchResults
          searchTerm={query}
          onResults={(results) => setHasResults(!!results)}
        />
      </div>
    </>
  ) : null;
}

export default SearchPanel;
