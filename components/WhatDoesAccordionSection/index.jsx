import React from "react";
import parse from "html-react-parser";
import Accordion from "../Accordion";
import AccordionGroup from "../AccordionGroup";
import styles from "./WhatDoesAccordionSection.module.scss";
import PropTypes from "prop-types";

/**
 * WhatDoesAccordionSection
 * Section displaying what does car insurance cover in canada for auto-insurance page.
 * Section displaying what does tenant insurance cover in canada for tenant-insurance page.
 * Section displaying what does home insurance cover in canada for home-insurance page. 
 * Section displaying what does condo insurance cover in canada for condo-insurance page. 
 */
function WhatDoesAccordionSection(props) {
    const { content, leftRightAccordianContent } = props;
    const { copy, headline } = content;

    const leftAccordionItems = leftRightAccordianContent['TwoColumnGenericAccordion.leftColumn'];
    const leftAccordionTitle = leftRightAccordianContent['TwoColumnGenericAccordion.leftTitle'];

    const rightAccordionItems = leftRightAccordianContent['TwoColumnGenericAccordion.rightColumn'];
    const rightAccordionTitle = leftRightAccordianContent['TwoColumnGenericAccordion.rightTitle'];

    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <h2 className={styles.heading}>{headline}</h2>
                {parse(copy)}
            </div>

            <div className={styles.rowColumnFlexBox}>
                {/* Left accordion items */}
                <div className={styles.columnsAlignment}>
                    <div className={styles.spacingsLeft}>
                        <h3>{leftAccordionTitle[0].headline}</h3>
                    </div>
                    <div className={styles.spacingsAccordianLeft}>
                        <AccordionGroup>
                            {leftAccordionItems.map((item) => (
                                <Accordion
                                    key={item.identifier}
                                    id={item.identifier}
                                    details={parse(item.copy)}
                                    summary={parse(item.headline)}
                                />
                            ))}
                        </AccordionGroup>
                    </div>
                </div>

                {/* Right accordion items */}
                <div className={styles.columnsAlignment}>
                    <div className={styles.spacingsRight}>
                        <h3>{rightAccordionTitle[0].headline}</h3>
                    </div>
                    <div className={styles.spacingsAccordianRight}>
                        <AccordionGroup>
                            {rightAccordionItems.map((item) => (
                                <Accordion
                                    key={item.identifier}
                                    id={item.identifier}
                                    details={parse(item.copy)}
                                    summary={parse(item.headline)}
                                />
                            ))}
                        </AccordionGroup>
                    </div>
                </div>
            </div>
        </section >
    );
}

WhatDoesAccordionSection.propTypes = {
    content: PropTypes.shape({
        headline: PropTypes.string,
        copy: PropTypes.string,
    }).isRequired,

    leftRightAccordianContent: PropTypes.shape({
        'TwoColumnGenericAccordion.leftColumn': PropTypes.array,
        'TwoColumnGenericAccordion.leftTitle': PropTypes.array,
        'TwoColumnGenericAccordion.rightColumn': PropTypes.array,
        'TwoColumnGenericAccordion.rightTitle': PropTypes.array,
    }).isRequired,
};

export default WhatDoesAccordionSection;