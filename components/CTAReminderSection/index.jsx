import React, { useContext } from "react";
import styles from "./CTAReminderSection.module.scss";
import parse from "html-react-parser";
import ModalContext from "../../context/modal";
import CTA from "../CTA";
import PropTypes from "prop-types";

/**
 * GetQuote
 * Get Quote Section for the home page and the landing pages. 
 */
function CTAReminderSection(props) {
  const content = props.content;
  const { setIsQuoteModalOpen } = useContext(ModalContext);

  return (
    <section className={styles.getQuoteSection}>
      <h2>{parse(content.copy)}</h2>
      <div className={styles.buttonContainerGaq}>
        <CTA
          type="secondary"
          onClick={() => setIsQuoteModalOpen(true)}
        >
          {content.cta}
        </CTA>
      </div>
    </section>
  );
}

CTAReminderSection.propTypes = {
  content: PropTypes.object.isRequired,
};

export default CTAReminderSection;
