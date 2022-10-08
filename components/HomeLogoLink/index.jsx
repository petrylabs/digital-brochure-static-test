import React from "react";
import Image from "next/image";

import { baseUrl } from "../../config";
import headerData from "../../site-data/header.preval";
import { customLoader } from "../../utils/images";
import styles from "./HomeLogoLink.module.scss";

/**
 * HomeLogoLink
 * Displays the Sonnet wordmark as a "home" logo. Used in Desktop & mobile navigation.
 */
function HomeLogoLink() {
  const content = headerData.data.headerMenu;

  return (
    <a href={content.logoHref} className={styles.link}>
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
      {/* TODO: is this available from CMS? */}
      {/* TODO: translate */}
      <span className="visually-hidden">Home / Acceuil</span>
    </a>
  );
}

export default HomeLogoLink;
