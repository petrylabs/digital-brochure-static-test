import React from "react";
import parse, { attributesToProps, domToReact } from "html-react-parser";
import PropTypes from "prop-types";

import styles from "./ParsedCopy.module.scss";

/**
 * ParsedCopy
 * Parses HTML copy strings from dotCMS and replaces <snt-link> components
 */
function ParsedCopy(props) {
  const { copy } = props;

  const parsedCopy = parse(copy, {
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
  });

  return <>{parsedCopy}</>;
}

ParsedCopy.propTypes = {
  copy: PropTypes.string,
};

export default ParsedCopy;
