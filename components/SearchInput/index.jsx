import React from "react";
import PropTypes from "prop-types";

import SearchIcon from "../../icons/SearchIcon";
import styles from "./SearchInput.module.scss";
import { getLanguageVariable } from "../../utils/languageVariable";
import { useContext } from "react";
import LanguageContext from "../../context/language";

/**
 * SearchInput
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */
function SearchInput(props) {
  const { lang } = useContext(LanguageContext);
  const { value, onChange } = props;

  return (
    <div className={styles.inputContainer}>
      <SearchIcon />
      <input
        id="search"
        type="search"
        aria-autocomplete="both"
        aria-controls="search-listbox"
        placeholder={getLanguageVariable("header-Search", lang)}
        autoComplete="off"
        autoFocus
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
