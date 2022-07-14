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
  const { children, open } = props;

  return (
    <MuiModal open={open} classes={{ root: styles.root }}>
      <div className={styles.container}>
        {/* modal content: */}
        {children}

        <button type="button" className={styles.closeButton}>
          <CloseIcon />
        </button>
      </div>
    </MuiModal>
  );
}

Modal.propTypes = {
  /** Modal content: */
  children: PropTypes.node.isRequired,

  /** Is Modal open or not: */
  open: PropTypes.bool.isRequired,
};

export default Modal;
