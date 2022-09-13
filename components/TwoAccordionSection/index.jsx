import React from "react";
import parse from "html-react-parser";
import Accordion from "../Accordion";
import AccordionGroup from "../AccordionGroup";
import styles from "./TwoAccordionSection.module.scss";
import PropTypes from "prop-types";

/**
 * TwoAccordionSection
 * Section displaying what does car insurance cover in canada for auto-insurance page.
 * Section displaying what does tenant insurance cover in canada for tenant-insurance page.
 * Section displaying what does home insurance cover in canada for home-insurance page. 
 * Section displaying what does condo insurance cover in canada for condo-insurance page. 
 */
function TwoAccordionSection(props) {
    const { content, leftRightAccordianContent } = props;
    const { copy, headline } = content;

    const leftAccordionItems = leftRightAccordianContent[0].leftColumn;
    const leftAccordionTitle = leftRightAccordianContent[0].leftTitle;

    const rightAccordionItems = leftRightAccordianContent[0].rightColumn;
    const rightAccordionTitle = leftRightAccordianContent[0].rightTitle;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>{headline}</h2>
                {parse(copy)}

                <div className={styles.rowColumnFlexBox}>
                    <div className={styles.accordionGroup}>
                        {/* Left accordion items */}
                        <h3 className={styles.accordionHeading}>{leftAccordionTitle.headline}</h3>
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

                    {/* Right accordion items */}
                    <div className={styles.accordionGroup}>
                        <h3 className={styles.accordionHeading}>{rightAccordionTitle.headline}</h3>
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

TwoAccordionSection.propTypes = {
    content: PropTypes.shape({
        headline: PropTypes.string,
        copy: PropTypes.string,
    }).isRequired,

    leftRightAccordianContent: PropTypes.shape({
        leftColumn: PropTypes.array,
        leftTitle: PropTypes.object,
        rightColumn: PropTypes.array,
        rightTitle: PropTypes.object,
    }).isRequired,
};

export default TwoAccordionSection;