import React from "react";
import Image from "next/image";

import headerData from "../../site-data/header.preval";
import { baseUrl } from "../../config";
import { customLoader } from "../../utils/images";

/**
 * HomeLogoLink
 * Displays the Sonnet wordmark as a "home" logo. Used in Desktop & mobile navigation.
 */
function HomeLogoLink() {
  const content = headerData.data.headerMenu;

  return (
    <a href={content.logoHref}>
      <Image
        // TODO: Logo in content is white -- can we get the grey one?
        // src={`${baseUrl}${content.logoUrl}`}
        loader={customLoader}
        src={`${baseUrl}/dA/b47bb52683/fileAsset/sonnet-wordmark-grey.svg`}
        layout="fixed"
        width={100}
        height={20}
        alt=""
        priority
      />

      {/* For a11y */}
      {/* TODO: is this available from CMS? */}
      <span className="visually-hidden">Home / Acceuil</span>
    </a>
  );
}

export default HomeLogoLink;
