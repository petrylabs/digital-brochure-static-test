import React from "react";
import styles from "./AnimatedLink.module.scss";
import ExternalLinkIcon from "../../icons/ExternalLinkIcon.jsx";
import PropTypes from "prop-types";

/**
 * AnimatedLink
 * AnimatedLink; component to render internal and external navigation links
 */

function AnimatedLink(props) {
  const { href, title, linkText, target } = props;

  return (
    <a
      href={href}
      target={target}
      rel="noreferrer"
      title={title}
      className={styles.link}
    >
      <span className={styles.linkText}>{linkText}</span>
      {target === "_blank" && (
        <>
          {/* TODO: translate */}
          <span className="visually-hidden">This is an external link</span>
          <span
            className={styles.icon}
            title="This is an external link"
            aria-hidden
          >
            <ExternalLinkIcon />
          </span>
        </>
      )}
    </a>
  );
}

AnimatedLink.propTypes = {
  // nav item href
  href: PropTypes.string.isRequired,

  // string value states if the anchor tag has the title.
  title: PropTypes.string,

  // string value states if the anchor tag has the text.
  linkText: PropTypes.string.isRequired,

  // string value states what is the target value "_blank" or "_self".
  target: PropTypes.oneOf(["_blank", "_self"]).isRequired,
};

export default AnimatedLink;
