import React from "react";
import CloseIcon from "../../icons/CloseIcon";
import ParsedCopy from "../ParsedCopy";
import styles from "./SiteBanners.module.scss";

/**
 * SiteBanners
 * Manages and displays site banners at the top of the page
 */
function SiteBanners() {
  const copy = `<p><b>Heads up!</b> Our site is currently unavailable while we make some updates. Sorry for the inconvenience. We will be back up as soon as we can. <a href="#">Learn more</a>.</p>`;
  const banners = [
    { type: "primary", copy: copy },
    { type: "secondary", copy: copy },
    { type: "secondary", copy: copy },
  ];

  return (
    <section aria-label="notifications" className={styles.section}>
      {banners.map((b, i) => (
        <article key={i} className={`${styles.banner} ${styles[b.type]}`}>
          <div>
            <ParsedCopy copy={b.copy} animatedLinks />
          </div>
          <button type="button" className={styles.closeButton}>
            <CloseIcon />
          </button>
        </article>
      ))}
    </section>
  );
}

export default SiteBanners;
