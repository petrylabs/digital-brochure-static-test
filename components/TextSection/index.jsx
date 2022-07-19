import React from "react"; 
import PropTypes from "prop-types";
import styles from "./TextSection.module.scss"; 

/** 
* TextSection 
* @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179769946/TextSection 
*/ 

function TextSection(props) {
  const titleString = props.titleString;
  const copyString = props.copyString;

  return (
    <div className={styles.spacings}>
      {titleString.length && <h2 className={styles.header}>{titleString}</h2>}
      {copyString && <div className={`${styles.content}`}>{copyString}</div>}
    </div>
  );
}

TextSection.propTypes = {
  titleString: PropTypes.string,
  copyString: PropTypes.node
}

export default TextSection; 

 
 