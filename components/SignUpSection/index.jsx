import React, { useContext } from "react";
import PropTypes from "prop-types";

import ModalContext from "../../context/modal";
import CTA from "../CTA";
import styles from "./SignUpSection.module.scss";

/**
 * SignUp
 * Sign Up section for home page. 
 */
function SignUpSection(props) {
  const { content } = props;
  const { setIsSignUpModalOpen } = useContext(ModalContext);

  return (
    <section className={styles.container}>
      <h2 className={`h4 ${styles.heading}`}>{content.headline}</h2>
      <div className={styles.buttonContainer}>
        <CTA type="secondary" onClick={() => setIsSignUpModalOpen(true)}>
          {content.cta}
        </CTA>
      </div>
    </section>
  );
}

SignUpSection.propTypes = {
  content: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    cta: PropTypes.string.isRequired,
  }).isRequired,
};

export default SignUpSection;
