import React from "react";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import FooterLink from "../FooterLink";

/**
 * Replace <snt-link> with <FooterLink /> in copy
 */
function ReplaceSntLinkWithFooterLink(props) {
    const { copy } = props;

    return parse(copy, {
        replace: (domNode) => {
            const { name, attribs } = domNode;
            if (name === "snt-link") {
                return <FooterLink href={attribs.href} title={attribs.title} />;
            }
        },
    });
};

ReplaceSntLinkWithFooterLink.propTypes = {
    copy: PropTypes.string.isRequired,
};

export default ReplaceSntLinkWithFooterLink;
