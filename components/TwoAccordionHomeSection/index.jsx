import React from "react";
import parse from "html-react-parser";
import Accordion from "../Accordion";
import AccordionGroup from "../AccordionGroup";
import styles from "./TwoAccordionHomeSection.module.scss";
import PropTypes from "prop-types";

/**
 * TwoAccordionHomeSection
 * Section displaying Canadian Insurance that fits your needs.
 */
function TwoAccordionHomeSection(props) {
    const { content, leftRightAccordianContent } = props;
    const { copy, headline } = content;

    const leftAccordionItems = leftRightAccordianContent['AccordionGenericTwoColumnNoTitle.leftColumn'];

    const rightAccordionItems = leftRightAccordianContent['AccordionGenericTwoColumnNoTitle.rightColumn'];

    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <h2 className={styles.heading}>{headline}</h2>
                {parse(copy)}
            </div>

            <div className={styles.rowColumnFlexBox}>
                {/* Left accordion items */}
                <div className={styles.columnsAlignment}>
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

TwoAccordionHomeSection.propTypes = {
    content: PropTypes.shape({
        headline: PropTypes.string,
        copy: PropTypes.string,
    }).isRequired,

    leftRightAccordianContent: PropTypes.shape({
        'AccordionGenericTwoColumnNoTitle.leftColumn': PropTypes.array,
        'AccordionGenericTwoColumnNoTitle.rightColumn': PropTypes.array,
    }).isRequired,
};

export default TwoAccordionHomeSection;