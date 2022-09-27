import React from "react";
import styles from "./AnimatedLink.module.scss";
import isExternal from "../../utils/link";
import ExternalLinkIcon from "../../icons/ExternalLinkIcon.jsx";
import PropTypes from "prop-types";

/**
 * AnimatedLink
 * AnimatedLink; component to render internal and external navigation links
 */

function AnimatedLink(props) {
  const { href, title, externalLink } = props;
  const isExternalLink =
    externalLink == undefined ? isExternal(href) : externalLink;

  return (
    <>
      <a
        href={href}
        className={styles.link}
        target={isExternalLink ? "_blank" : "_self"}
        rel="noreferrer"
        title={title}
      >
        <span className={styles.linkText}>{title}</span>
        {isExternalLink && (
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
    </>
  );
}

AnimatedLink.propTypes = {
  // nav item href
  href: PropTypes.string.isRequired,

  // nav item title
  title: PropTypes.string.isRequired,

  // boolean value states if the nav item is external link
  externalLink: PropTypes.bool,
};

export default AnimatedLink;
