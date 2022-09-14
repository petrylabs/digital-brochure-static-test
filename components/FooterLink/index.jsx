import React from "react";
import styles from "./FooterLink.module.scss";
import isExternal from "../../utils/link";
import ExternalLinkIcon from "../../icons/ExternalLinkIcon.jsx";
import PropTypes from "prop-types";

/**
 * FooterLink
 * FooterLink; component to render internal and external navigation links
 */
function FooterLink(props) {
  const { href, title, style, externalLink, classes } = props;
  const isExternalLink =
    externalLink == undefined ? isExternal(href) : externalLink;

  return (
    <>
      <a
        href={href}
        className={`${styles.link} ${classes}`}
        target={isExternalLink ? "_blank" : "_self"}
        style={style}
        rel="noreferrer"
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

FooterLink.propTypes = {
  // nav item href
  href: PropTypes.string.isRequired,

  // nav item title
  title: PropTypes.string.isRequired,

  // custom styles for nav item
  style: PropTypes.object,

  // boolean value states if the nav item is external link
  externalLink: PropTypes.bool,

  classes: PropTypes.object,
};

export default FooterLink;
