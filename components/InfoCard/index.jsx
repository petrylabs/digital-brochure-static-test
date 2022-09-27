import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import { baseUrl } from "../../config.js";
import { customLoader } from "../../utils/images";
import ParsedCopy from "../ParsedCopy";
import styles from "./InfoCard.module.scss";

/**
 * InfoCard
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179212881/InfoCard
 */

function InfoCard(props) {
  const { iconUrl, title, alt, content, externalLink = false, withBorder = false } = props;
  const src = baseUrl + iconUrl;

  return (
    <div
      className={`${styles.infoCard} ${withBorder && styles.infoCard__border}`}
    >
      <div className={styles.icon}>
        <Image
          loader={customLoader}
          src={src}
          alt={alt}
          width={45}
          height={45}
        />
      </div>
      <h3 className={styles.h3}>{title}</h3>
      <div className={styles.content}>
        <ParsedCopy copy={content} animatedLinks />
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  // url for card icon
  iconUrl: PropTypes.string.isRequired,
  // title of the card
  title: PropTypes.string.isRequired,
  // alt text of the icon
  alt: PropTypes.string.isRequired,
  // content copy of card
  content: PropTypes.string.isRequired,
  // optional prop to add border around the card
  withBorder: PropTypes.bool,
};

export default InfoCard;
