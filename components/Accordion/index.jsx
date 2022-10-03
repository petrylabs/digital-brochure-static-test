import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import PropTypes from "prop-types";

import styles from "./Accordion.module.scss";
import Chevron from "../../icons/Chevron";
import ParsedCopy from "../ParsedCopy";

/**
 * Accordion
 * A single expand/collapse panel. To control a set of Accordions, nest them inside an AccordionGroup.
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179409491/Accordion
 */
function Accordion(props) {
  const { details, expanded, id, onChange, summary } = props;
  return (
    <MuiAccordion
      id={id}
      square
      disableGutters
      TransitionProps={{ timeout: 0 }}
      classes={{ root: styles.accordion }}
      expanded={expanded}
      onChange={onChange}
    >
      <AccordionSummary
        id={`summary${id}`}
        aria-expanded={expanded}
        aria-controls={`details${id}`}
        expandIcon={<Chevron />}
        classes={{
          root: styles.summary,
          content: `h4 ${styles.summaryContent}`,
          expanded: styles.summaryExpanded,
          expandIconWrapper: styles.summaryIcon,
        }}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails id={`details${id}`} classes={{ root: styles.details }}>
        <ParsedCopy copy={details.props.copy} animatedLinks />
      </AccordionDetails>
    </MuiAccordion>
  );
}

Accordion.propTypes = {
  /** The content of the expanding panel */
  details: PropTypes.node.isRequired,

  /** The open vs. collapsed state of the Accordion */
  expanded: PropTypes.bool,

  /** Unique id for Accordion control */
  id: PropTypes.string.isRequired,

  /** Action to run on open/close of Accordion */
  onChange: PropTypes.func,

  /** The content of the clickable bar */
  summary: PropTypes.node.isRequired,
};

Accordion.defaultProps = {
  expanded: false,
};

export default Accordion;
