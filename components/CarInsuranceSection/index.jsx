import React from "react";
import parse from "html-react-parser";
import Accordion from "../Accordion";
import AccordionGroup from "../AccordionGroup";
import styles from "./CarInsuranceSection.module.scss";
import PropTypes from "prop-types";
import useWindowWidth from "../../hooks/useWindowWidth";
import { breakpoints } from "../../config";

/**
 * CarInsuranceSection
 * Section displaying what does car insurance cover in canada in an accordion
 */
function CarInsuranceSection(props) {
    const { content, leftRightAccordianContent } = props;
    const { copy, headline } = content;

    const leftAccordionItems = leftRightAccordianContent['TwoColumnGenericAccordion.leftColumn'];
    const leftAccordionTitle = leftRightAccordianContent['TwoColumnGenericAccordion.leftTitle'];

    const rightAccordionItems = leftRightAccordianContent['TwoColumnGenericAccordion.rightColumn'];
    const rightAccordionTitle = leftRightAccordianContent['TwoColumnGenericAccordion.rightTitle'];

    /* Handling screen sizes: */
    const screenWidth = useWindowWidth();

    const isTablet = screenWidth >= breakpoints.md;

    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <h2>{headline}</h2>
                <div className={styles.contentCopy}>{parse(copy)}</div>
            </div>

            {/* Rendering for Desktop and Tablet */}
            {isTablet && (
                <div className={styles.row}>
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
            )}

            {/* Rendering for Mobile */}
            {!isTablet && (
                <>
                    {/* Left accordion items */}
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

                    {/* Right accordion items */}
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
                </>
            )
            }
        </section >
    );
}

CarInsuranceSection.propTypes = {
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

export default CarInsuranceSection;