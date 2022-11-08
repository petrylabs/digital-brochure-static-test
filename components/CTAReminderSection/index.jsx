import React, { useContext } from "react";
import PropTypes from "prop-types";

import ModalContext from "../../context/modal";
import CTA from "../CTA";
import styles from "./CTAReminderSection.module.scss";

/**
 * GetQuote
 * Get Quote Section for the home page and the landing pages.
 */
function CTAReminderSection(props) {
  const { content } = props;
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  return (
    <section className={styles.getQuoteSection}>
      <h2>{content.headline}</h2>
      <div className={styles.buttonContainerGaq}>
        <CTA
          type="secondary"
          onClick={() => setIsQuoteModalOpen(true)}
          buttonId={content?.buttonId}
        >
          {content.cta}
        </CTA>
      </div>
    </section>
  );
}

CTAReminderSection.propTypes = {
  content: PropTypes.shape({
    headline: PropTypes.string.isRequired,
  }).isRequired,
};

export default CTAReminderSection;
