import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import styles from "./PartnershipSection.module.scss";
import PropTypes from "prop-types";
import useWindowWidth from "../../hooks/useWindowWidth";
import { breakpoints } from "../../config";
import { customLoader, imageAlt, imageSrc } from "../../utils/images";

/**
 * PartnershipSection
 * Section displaying what does car insurance cover in canada in an accordion
 */
function PartnershipSection(props) {
    const { content } = props;

    const screenWidth = useWindowWidth();

    const imageString = screenWidth < breakpoints.lg
        ? "GenericContent.imageSmall"
        : "GenericContent.image";

    return (
        <section className={styles.spacings}>
            <div className={styles.contentContainer}>
                <h2 className={styles.heading}>{content.headline}</h2>
                {parse(content.copy)}
            </div>
            <div className={styles.imageMobile}>
                <Image
                    loader={customLoader}
                    src={imageSrc(content, imageString)}
                    alt={imageAlt(content, imageString)}
                    layout="responsive"
                    width={100}
                    height={100}
                />
            </div>
        </section>
    );
}

PartnershipSection.propTypes = {
    content: PropTypes.shape({
        headline: PropTypes.string,
        copy: PropTypes.string,
    }).isRequired,
};

export default PartnershipSection;