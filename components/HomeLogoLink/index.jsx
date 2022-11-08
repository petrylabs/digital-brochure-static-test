import React, { useContext } from "react";
import Image from "next/image";

import { baseUrl, locales } from "../../config";
import headerData from "../../site-data/header.preval";
import { customLoader } from "../../utils/images";
import styles from "./HomeLogoLink.module.scss";
import LanguageContext from "../../context/language";
import { getLanguageVariable } from "../../utils/languageVariable";

/**
 * HomeLogoLink
 * Displays the Sonnet wordmark as a "home" logo. Used in Desktop & mobile navigation.
 */
function HomeLogoLink() {
  const { lang } = useContext(LanguageContext);

  const content = headerData[lang]?.headerMenu;

  return (
    <a id="nav_sonnet" href={content.logoHref} className={styles.link}>
      <Image
        // TODO: Logo in content is white -- can we get the grey one?
        // src={`${baseUrl}${content.logoUrl}`}
        loader={customLoader}
        src={`${baseUrl}/dA/b47bb52683/fileAsset/sonnet-wordmark-grey.svg`}
        layout="responsive"
        width={100}
        height={20}
        alt=""
        priority
      />

      {/* For a11y */}
      <span className="visually-hidden">
        {getLanguageVariable("category-propertyinsurance", lang)}
      </span>
    </a>
  );
}

export default HomeLogoLink;
