import React from "react";
import PropTypes from "prop-types";

function SearchIcon({ width, height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 45 45"
      fill="black"
      version="1.1"
    >
      <path
        d="M18.918,31.376 C11.828,31.376 6.06,25.67 6.06,18.655 C6.06,11.644 11.828,5.94 18.918,5.94 C26.006,5.94 31.774,11.644 31.774,18.655 C31.774,25.67 26.006,31.376 18.918,31.376 M44.2,40.401 L33.811,30.144 C36.329,26.975 37.832,22.985 37.832,18.655 C37.832,8.37 29.347,0 18.918,0 C8.486,0 0,8.37 0,18.655 C0,28.941 8.486,37.311 18.918,37.311 C22.981,37.311 26.75,36.04 29.836,33.882 L40.289,44.201 C40.826,44.732 41.536,45 42.244,45 C42.947,45 43.649,44.738 44.184,44.217 C45.266,43.165 45.272,41.459 44.2,40.401"
        id="path-1"
      />
    </svg>
  );
}

SearchIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

SearchIcon.defaultProps = {
  width: "15px",
  height: "25px",
};

export default SearchIcon;
