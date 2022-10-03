import React from "react";

import ParsedCopy from "../ParsedCopy";
import styles from "./SiteBanners.module.scss";

/**
 * SiteBanners
 * Manages and displays site banners at the top of the page
 */
function SiteBanners() {
  const copy = `<p><b>Heads up!</b> Our site is currently unavailable while we make some updates. Sorry for the inconvenience. We will be back up as soon as we can. <a href="#">Learn more</a>.</p>`;
  const banners = [
    { id: 1, type: "primary", copy: copy },
    { id: 2, type: "secondary", copy: copy },
    { id: 3, type: "secondary", copy: copy },
  ];

  return (
    <section aria-label="notifications" className={styles.section}>
      {banners.map((b, i) => (
        <article key={i} className={`${styles.banner} ${styles[b.type]}`}>
          <ParsedCopy copy={b.copy} animatedLinks />
        </article>
      ))}
    </section>
  );
}

export default SiteBanners;
