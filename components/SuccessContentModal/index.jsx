import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

import { baseUrl } from "../../config.js";
import styles from "./SuccessContentModal.module.scss";
import ParsedCopy from "../ParsedCopy";
import { customLoader } from "../../utils/images";
import Modal from "../Modal";

/**
 * Success Content Modal
 * Styled wrapper for MUI modal to display success content
 */
function SuccessContentModal({ open, content, onClose }) {
  const src = baseUrl + content.fields?.icon?.url;
  const alt = baseUrl + content.fields?.icon?.altText;
  return (
    <Modal open={open} onClose={onClose}>
      <section className={styles.contentSection}>
        <div className={styles.icon}>
          <Image
            loader={customLoader}
            src={src}
            alt={alt}
            width={"45"}
            height={"45"}
          />
        </div>
        <h2>{content?.headline}</h2>
        <ParsedCopy copy={content?.copy} />
      </section>
    </Modal>
  );
}

SuccessContentModal.propTypes = {
  /** Is Modal open or not: */
  open: PropTypes.bool.isRequired,

  /** Modal content: */
  content: PropTypes.object.isRequired,

  /** Function to run when closing modal */
  onClose: PropTypes.func.isRequired,
};

export default SuccessContentModal;
