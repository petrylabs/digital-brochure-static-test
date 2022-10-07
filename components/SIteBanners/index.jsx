import React, { useEffect, useState } from "react";

import banners from "../../site-data/banners.preval";
import { getSiteBanners } from "../../utils/api";
import ParsedCopy from "../ParsedCopy";
import styles from "./SiteBanners.module.scss";

/**
 * SiteBanners
 * Manages and displays site banners at the top of the page
 */
function SiteBanners() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeBanners, setActiveBanners] = useState(banners.data.contentlets);

  useEffect(() => {
    async function fetchBanners() {
      const fetched = await getSiteBanners();
      const activeSorted =
        fetched?.data?.contentlets
          ?.filter((b) => b.active === "true")
          .sort((a, b) => b.order - a.order) || [];
      setActiveBanners(activeSorted);
      setIsMounted(true);
    }
    fetchBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMounted) {
    return (
      <section aria-label="notifications">
        {activeBanners?.length > 0 &&
          activeBanners?.map((b) => (
            <article key={b.identifier} className={styles.banner}>
              <ParsedCopy copy={b.copy} />
            </article>
          ))}
      </section>
    );
  }

  return <div />;
}

export default SiteBanners;
