import React from "react";
import PropTypes from "prop-types";

import styles from "./CTA.module.scss";

/**
 * CTA
 * Smart component that renders a styled CTA as a link or a button
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179081829/CTA
 */
function CTA(props) {
  const { buttonId, children, onClick, small, target, type, url } = props;

  /** CTA is a link if URL is provided */
  const isLink = !!url;

  const ctaClass = `${styles.cta} ${small ? styles.ctaSmall : ""} ${
    styles[type]
  }`;

  return isLink ? (
    <a href={url} className={ctaClass} target={target}>
      {children}
    </a>
  ) : (
    <button
      type="button"
      id={buttonId}
      className={ctaClass}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}

CTA.propTypes = {
  buttonId: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  target: PropTypes.oneOf(["_self", "_blank", "_parent", "_top"]),
  type: PropTypes.oneOf(["primary", "secondary"]),
  url: PropTypes.string,
};

CTA.defaultProps = {
  onClick: () => {},
  small: false,
  target: null,
  type: "primary",
};

export default CTA;
