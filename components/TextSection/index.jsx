import React from "react"; 
import Parser from "html-react-parser"; 
import styles from "./TextSection.module.scss"; 

/** 
* TextSection 
* @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179769946/TextSection 
*/ 
// only one props(json object) comes in 

function TextSection(props) { 
const hostElement = props.data; 
const titleString = hostElement[0].headline; 
const hasCopy = ('copy' in hostElement[0]); 
const copyString = hasCopy ? hostElement[0].copy: ""; 

return (<div className={styles.spacings}> 
{titleString.length && <h2 className={styles.header}>{titleString}</h2>} 
{hasCopy && (<div className={`${styles.content}`}>{Parser(copyString)}</div> 
)} 
</div> 
); 
} 

export default TextSection; 

 
 