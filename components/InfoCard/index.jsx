import React from "react";
import styles from "./InfoCard.module.scss";
import parse from "html-react-parser";
import Image from "next/image";
import PropTypes from "prop-types";

/**
 * InfoCard
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179212881/InfoCard
 */

function InfoCard(props) {
  const { iconUrl, title, content, withBorder } = props;
  return (
    <div
      className={`${styles.infoCard} ${withBorder && styles.infoCard__border}`}
    >
      <div className={styles.icon}>
        <Image src={iconUrl} alt="" width={45} height={45} />
      </div>
      <h3 className={styles.h3}>{title}</h3>
      <div className={styles.content}>{parse(content)}</div>
    </div>
  );
}

InfoCard.propTypes = {
  // url for card icon
  iconUrl: PropTypes.string,
  // title of the card
  title: PropTypes.string,
  // content copy of card consisting of HTML element
  content: PropTypes.node,
  // controls border around the card
  withBorder: PropTypes.bool,
};

export default InfoCard;
