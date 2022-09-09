import React from "react";
import styles from "./InfoCard.module.scss";
import Image from "next/image";
import PropTypes from "prop-types";
import { customLoader } from "../../utils/images";
import { baseUrl } from "../../config.js";

/**
 * InfoCard
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179212881/InfoCard
 */

function InfoCard(props) {
  const { iconUrl, title, alt, content, withBorder = false } = props;
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
      <div className={styles.content}>{content}</div>
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
  // content copy of card consisting of HTML element
  content: PropTypes.node.isRequired,
  // optional prop to add border around the card
  withBorder: PropTypes.bool,
};

export default InfoCard;
