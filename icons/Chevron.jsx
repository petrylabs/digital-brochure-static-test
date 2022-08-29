import React from "react";
import PropTypes from "prop-types";

function Chevron({ direction, size }) {
  const rotation = {
    down: 0,
    left: 90,
    up: 180,
    right: 270,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${rotation[direction]}deg)`,
        transformOrigin: "center",
      }}
      fill="currentColor"
    >
      <path d="M22.4891039,34 C21.9795084,34 21.4699128,33.8149412 21.0709531,33.4448236 L0.680426242,14.6563092 C-0.174487332,13.8689682 -0.23148157,12.5365449 0.553027357,11.6785451 C1.33753628,10.8239099 2.66851938,10.7700746 3.51672775,11.554051 L22.4891039,29.0370597 L41.4815957,11.5574157 C42.3365092,10.7734393 43.6574345,10.8272746 44.4486486,11.6852745 C45.229805,12.5432743 45.1761633,13.8756976 44.3178972,14.6630387 L23.9106072,33.4481883 C23.508295,33.8149412 22.9986994,34 22.4891039,34 Z" />
    </svg>
  );
}

Chevron.propTypes = {
  direction: PropTypes.oneOf(["up", "down", "left", "right"]),
  size: PropTypes.string,
};

Chevron.defaultProps = {
  direction: "down",
  size: "15px",
};

export default Chevron;
