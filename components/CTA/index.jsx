import React from "react";
import PropTypes from "prop-types";

import styles from "./CTA.module.scss";

/**
 * CTA
 * Smart component that renders a styled CTA as a link or a button
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179081829/CTA
 */
function CTA(props) {
  const { children, type, target, url } = props;

  /** CTA is a link if URL is provided */
  const isLink = !!url;

  const ctaClass = `${styles.cta} ${styles[type]}`;

  return isLink ? (
    <a href={url} className={ctaClass}>
      {children}
    </a>
  ) : (
    <button type="button" className={ctaClass}>
      {children}
    </button>
  );
}

CTA.propTypes = {
  /** CTA text */
  children: PropTypes.string.isRequired,

  /** CTA style */
  type: PropTypes.oneOf(["primary", "secondary"]),

  /** link target */
  target: PropTypes.oneOf(["self", "blank", "parent", "top"]),

  /** link destination url */
  url: PropTypes.string.isRequired,
};

CTA.defaultProps = {
  type: "primary",
  target: "self",
};

export default CTA;
