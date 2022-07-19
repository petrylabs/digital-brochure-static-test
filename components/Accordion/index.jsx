import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import PropTypes from "prop-types";

/**
 * Accordion
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179409491/Accordion
 */
function Accordion(props) {
  const { details, summary } = props;

  return (
    <MuiAccordion>
      <AccordionSummary>{summary}</AccordionSummary>
      <AccordionDetails>{details}</AccordionDetails>
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
