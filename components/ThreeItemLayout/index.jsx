import React from "react";
import PropTypes from "prop-types";

import styles from "./ThreeItemLayout.module.scss";

/**
 * ThreeItemLayout
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179966523/ThreeItemLayout
 */

function ThreeItemLayout(props) {
  const { children, variableGap } = props;
  const threeItems = children.filter((child, i) => i < 3);

  return (
    <ul className={`${styles.list} ${variableGap ? styles.variableGap : ""}`}>
      {threeItems &&
        threeItems.map((item, i) => (
          <li key={i} className={styles.listItem}>
            {item}
          </li>
        ))}
    </ul>
  );
}

ThreeItemLayout.propTyoes = {
  /* Elements between component tags */
  children: PropTypes.node.isRequired,

  /* Whether gap between items is narrower on small screens */
  variableGap: PropTypes.bool,
};

export default ThreeItemLayout;
