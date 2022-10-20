import React from "react";
import { Modal as MuiModal } from "@mui/material";
import PropTypes from "prop-types";

import CloseIcon from "../../icons/CloseIcon";
import styles from "./Modal.module.scss";

/**
 * Modal
 * Styled wrapper for MUI modal.
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179114937/Modal
 */
function Modal(props) {
  const { children, onClose, open, isQuoteModal = false } = props;

  return (
    <MuiModal
      open={open}
      classes={{ root: styles.root }}
      onClose={() => onClose()}
    >
      <div
        className={`${styles.container} ${
          isQuoteModal
            ? styles.containerQuoteModal
            : styles.containerSignUpModal
        }`}
      >
        {/* modal content: */}
        {children}

        <button
          type="button"
          className={styles.closeButton}
          onClick={() => onClose()}
        >
          <CloseIcon />
        </button>
      </div>
    </MuiModal>
  );
}

Modal.propTypes = {
  /** Modal content: */
  children: PropTypes.node.isRequired,

  /** Function to run when closing modal */
  onClose: PropTypes.func.isRequired,

  /** Is Modal open or not: */
  open: PropTypes.bool.isRequired,

  /** Is Quote Modal or not */
  isQuoteModal: PropTypes.bool,
};

export default Modal;
