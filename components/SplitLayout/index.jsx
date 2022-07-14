import React from "react";
import styles from "./SplitLayout.module.scss";

/**
 * SplitLayout
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179311170/SplitLayout
 */

function SplitLayout(props) {
  const { children, contentRight = false } = props;

  return (
    <div className={`${styles["flex-container"]} ${contentRight ? "" : styles["content-left"]}`}>
      <div className={styles["image-column"]}>
        {children[0]}
      </div>
      <div className={styles["content-column"]}>
        <div className={styles["content-container"]}>
          {children[1]}
        </div>
      </div>
    </div>
  );
}

export default SplitLayout;