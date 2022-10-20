import React, { useContext, useEffect, useRef, useState } from "react";
import { forwardRef } from "react";
import { languageId, locales } from "../../config";
import LanguageContext from "../../context/language";

import banners from "../../site-data/banners.preval";
import { getSiteBanners } from "../../utils/api";
import ParsedCopy from "../ParsedCopy";
import styles from "./SiteBanners.module.scss";

/**
 * SiteBanners
 * Manages and displays site banners at the top of the page
 */
function SiteBanners(props) {
  const { setHeight } = props;

  const { lang } = useContext(LanguageContext);
  const currentLanguageId = lang === locales.fr ? languageId.fr : languageId.en;

  const [isMounted, setIsMounted] = useState(false);
  const [activeBanners, setActiveBanners] = useState(
    banners[lang].data.contentlets
  );

  const ref = useRef();
  const setBannersHeight = () => setHeight(ref.current?.clientHeight);

  async function fetchBanners() {
    const fetched = await getSiteBanners(currentLanguageId);
    const activeSorted =
      fetched?.data?.contentlets
        ?.filter((b) => b.active === "true")
        .sort((a, b) => b.order - a.order) || [];
    setActiveBanners(activeSorted);
    setIsMounted(true);
    setBannersHeight();
  }

  useEffect(() => {
    fetchBanners();
    window.addEventListener("resize", () => setBannersHeight());
    return () => window.removeEventListener("resize", () => setBannersHeight());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isMounted) {
    return (
      <section aria-label="notifications / annonces" ref={ref}>
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
