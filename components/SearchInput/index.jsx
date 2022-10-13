import React, { useContext } from "react";
import PropTypes from "prop-types";

import SearchIcon from "../../icons/SearchIcon";
import styles from "./SearchInput.module.scss";
import { getLanguageVariable } from "../../utils/languageVariable";
import LanguageContext from "../../context/language";

/**
 * SearchInput
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */
function SearchInput(props) {
  const { lang } = useContext(LanguageContext);
  const { value, onChange, hasResults } = props;

  // const listboxId = this.hostElement.id ? `${this.hostElement.id}-listbox` : null;

  return (
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
        value={value}
        onChange={onChange}
        // aria-activedescendant={this.activeIndex >= 0 ? resultItemPrefix + this.activeIndex : null}
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
