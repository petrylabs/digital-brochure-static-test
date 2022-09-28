import React from "react";
import ParsedCopy from "../ParsedCopy";
import styles from "./SiteBanners.module.scss";

/**
 * SiteBanners
 * Manages and displays site banners at the top of the page
 */
function SiteBanners() {
  const banners = [];
  const copy = `<p><b>Heads up!</b> Our site is currently unavailable while we make some updates. Sorry for the inconvenience. We will be back up as soon as we can. <a href="#">Learn more</a></p>.`;

  return (
    <section aria-label="notifications">
      <article className={styles.blue}>
        <ParsedCopy copy={copy} />
      </article>

      <article className={styles.grey}>
        <ParsedCopy copy={copy} />
      </article>
    </section>
  );
}

export default SiteBanners;
