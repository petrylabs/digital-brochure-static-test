import React from "react";
import styles from "./ThreeItemLayout.module.scss";

/**
 * ThreeItemLayout
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179966523/ThreeItemLayout
 */

function ThreeItemLayout(props) {
  const { children } = props;
  const threeItems = children.filter((child, i) => i < 3);

  return (
    <ul className={styles.list}>
      {threeItems &&
        threeItems.map((item, i) => (
          <li key={i} className={styles.listItem}>
            {item}
          </li>
        ))}
    </ul>
  );
}

export default ThreeItemLayout;
