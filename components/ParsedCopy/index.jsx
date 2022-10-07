import React from "react";
import parse, { domToReact } from "html-react-parser";
import PropTypes from "prop-types";
import AnimatedLink from "../AnimatedLink";

/**
 * ParsedCopy
 * Parses HTML copy strings from dotCMS and replaces <snt-link> components.
 */

function ParsedCopy(props) {
  const { copy } = props;

  const parsingOptions = {
    replace: (node) => {
      const { name, attribs, children } = node;
      if (name === "snt-link" || name === "a") {
        return (
          <AnimatedLink
            href={attribs.href}
            title={attribs.title}
            linkText={domToReact(children)}
            target={attribs.target}
          />
        );
      }
    },
  };

  return <>{parse(copy, parsingOptions)}</>;
}

ParsedCopy.propTypes = {
  copy: PropTypes.string.isRequired,
};

export default ParsedCopy;
