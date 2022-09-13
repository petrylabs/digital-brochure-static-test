import React from "react";
import parse, { attributesToProps, domToReact } from "html-react-parser";
import PropTypes from "prop-types";

import styles from "./ParsedCopy.module.scss";

/**
 * ParsedCopy
 * Parses HTML copy strings from dotCMS and replaces <snt-link> components
 */
function ParsedCopy(props) {
  const { copy, animatedLinks } = props;

  const parsingOptions = animatedLinks
    ? {
        replace: (node) => {
          if (node.attribs && node.name === "snt-link") {
            const props = attributesToProps(node.attribs);
            return (
              <a className={styles.sntLink} {...props}>
                {domToReact(node.children)}
              </a>
            );
          }
        },
      }
    : null;

  return <>{parse(copy, parsingOptions)}</>;
}

ParsedCopy.propTypes = {
  copy: PropTypes.string.isRequired,
  animatedLinks: PropTypes.bool,
};

export default ParsedCopy;
