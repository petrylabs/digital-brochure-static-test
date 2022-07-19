import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import PropTypes from "prop-types";

import styles from "./Accordion.module.scss";

/**
 * Accordion
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179409491/Accordion
 */
function Accordion(props) {
  const { details, summary } = props;

  return (
    <MuiAccordion
      square
      disableGutters
      TransitionProps={{ timeout: 0 }}
      classes={{ root: styles.accordion }}
    >
      <AccordionSummary
        classes={{
          root: styles.summary,
          content: styles.summaryContent,
          expanded: styles.summaryExpanded,
        }}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails classes={{ root: styles.details }}>
        {details}
      </AccordionDetails>
    </MuiAccordion>
  );
}

Accordion.propTypes = {
  /** The content of the expanding panel */
  details: PropTypes.node.isRequired,

  /** The content of the clickable bar */
  summary: PropTypes.node.isRequired,
};

export default Accordion;
