import React from "react";
import styles from "./NavItem.module.scss";
import isExternal from "../../utils/link";
import ExternalLinkIcon from "../../icons/ExternalLinkIcon.jsx";
import PropTypes from "prop-types";

/**
 * NavItem
 * NavItem; component to render internal and external navigation links
 */
function NavItem(props) {
  const { href, title, style, externalLink } = props;
  const isExternalLink =
    externalLink == undefined ? isExternal(href) : externalLink;

  return (
    <>
      <a
        href={href}
        className={styles.link}
        style={style}
        target={isExternalLink ? "_blank" : "_self"}
        rel="noreferrer"
      >
        {title}
      </a>
      {isExternalLink && <ExternalLinkIcon />}
    </>
  );
}

NavItem.propTypes = {
  // nav item href
  href: PropTypes.string.isRequired,

  // nav item title
  title: PropTypes.string.isRequired,

  // custom styles for nav item
  style: PropTypes.object,

  // boolean value states if the nav item is external link
  externalLink: PropTypes.bool,
};

export default NavItem;
