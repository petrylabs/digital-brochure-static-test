import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import useWindowWidth from "../../hooks/useWindowWidth";

/**
 * LargeScreenImage
 * Image wrapper that renders an image on wide screens only.
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178852455/LargeScreenImage
 */
function LargeScreenImage(props) {
  const screenWidth = useWindowWidth();

  if (screenWidth > 767) {
    return <Image {...props} />;
  }

  return null;
}

LargeScreenImage.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default LargeScreenImage;
