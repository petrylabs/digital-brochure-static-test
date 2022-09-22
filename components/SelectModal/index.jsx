import React from "react";
import { Modal as MuiModal } from "@mui/material";
import PropTypes from "prop-types";

import styles from "./SelectModal.module.scss";

/**
 * Select Modal
 * Styled wrapper for MUI modal for select input on smaller screen.
 */
function SelectModal(props) {
  const { children, onClose, open } = props;

  return (
    <MuiModal
      open={open}
      classes={{ root: styles.root }}
      onClose={() => onClose()}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => onClose()}
          >
            <span>{"Close"}</span>
            <span className={styles.closeIcon} />
          </button>
        </div>
        {/* modal content: */}
        {children}
      </div>
    </MuiModal>
  );
}

SelectModal.propTypes = {
  /** Modal content: */
  children: PropTypes.node.isRequired,

  /** Function to run when closing modal */
  onClose: PropTypes.func.isRequired,

  /** Is Modal open or not: */
  open: PropTypes.bool.isRequired,
};

export default SelectModal;
