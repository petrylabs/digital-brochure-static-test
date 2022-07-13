import React from "react";
import styles from "./ThreePartLayout.module.scss";

/**
 * ThreePartLayout
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179966523/ThreePartLayout
 */

function ThreePartLayout(props) {
  const { children } = props;
  const threeItems = children.filter((child, i) => i < 3);

  return (
    <ul className={styles.list}>
      {threeItems &&
        threeItems.map((item) => <li className={styles.listItem}>{item}</li>)}
    </ul>
  );
}

export default ThreePartLayout;
