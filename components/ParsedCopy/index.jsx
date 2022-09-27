import React from "react";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import PropTypes from "prop-types";

import styles from "./ParsedCopy.module.scss";
import AnimatedLink from "../AnimatedLink";

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
            <AnimatedLink
              href={props.href}
              title={props.title}
              // linkText={domToReact(children)}
            />
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
