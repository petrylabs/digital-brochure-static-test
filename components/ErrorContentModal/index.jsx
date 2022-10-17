import React from "react";
import PropTypes from "prop-types";

import styles from "./ErrorContentModal.module.scss";
import Modal from "../Modal";
import CTA from "../CTA";
import ParsedCopy from "../ParsedCopy";
import ModalContext from "../../context/modal";

/**
 * Error Content Modal
 * Styled wrapper for MUI modal to display error content
 */
function ErrorContentModal({ open, content, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <section className={styles.contentSection}>
        <h2>{content?.headline}</h2>
        <ParsedCopy copy={content?.copy} />
        <div className={styles.buttonContainer}>
          <CTA type="primary" onClick={onClose}>
            {/* ToDo translate */}
            Go Back
          </CTA>
        </div>
      </section>
    </Modal>
  );
}

ErrorContentModal.propTypes = {
  /** Is Modal open or not: */
  open: PropTypes.bool.isRequired,

  /** Modal content: */
  content: PropTypes.object.isRequired,

  /** Function to run when closing modal */
  onClose: PropTypes.func.isRequired,
};

export default ErrorContentModal;
