import React, { useContext } from "react";
import PropTypes from "prop-types";
import ParsedCopy from "../ParsedCopy";

import styles from "./NavCard.module.scss";
import { getLanguageVariable } from "../../utils/languageVariable";
import LanguageContext from "../../context/language";

/**
 * NavCard
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178983474/NavCard
 */

function NavCard(props) {
  const { lang } = useContext(LanguageContext);
  const { mainText, url, subText, isNew, id } = props;

  return (
    <a href={url} className={styles.navLink} id={id}>
      <span>{mainText}</span>

      {isNew && (
        <span className={styles.newTag}>
          {getLanguageVariable("tog", lang)}
        </span>
      )}

      <div className={styles.subText}>
        <ParsedCopy copy={subText} />
      </div>
    </a>
  );
}

NavCard.propTypes = {
  url: PropTypes.string.isRequired,
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

export default NavCard;
