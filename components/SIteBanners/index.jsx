import React, { useEffect } from "react";
import { useState } from "react";

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

  const [activeBanners, setActiveBanners] = useState([]);

  useEffect(() => {
    // make API call to identify active banner IDs
    setActiveBanners([
      { id: 1, type: "primary", copy: copy },
      { id: 3, type: "secondary", copy: copy },
    ]);
  }, [setActiveBanners]);

  const isActive = (id) => {
    return Boolean(activeBanners.find((b) => b.id === id));
  };

  return (
    <section aria-label="notifications" className={styles.section}>
      {activeBanners?.map((b, i) => (
        <article
          key={i}
          className={`${styles.banner} ${styles[b.type]}`}
          style={{ display: isActive(b.id) ? "block" : "none" }}
        >
          <ParsedCopy copy={b.copy} animatedLinks />
        </article>
      ))}
    </section>
  );
}

export default SiteBanners;
