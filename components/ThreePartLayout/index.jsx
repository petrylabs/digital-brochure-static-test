import React from "react";

/**
 * ThreePartLayout
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179966523/ThreePartLayout
 */

function ThreePartLayout(props) {
  const { children } = props;
  const threeItems = children.filter((child, i) => i < 3);

  return <ul>{threeItems && threeItems.map((item) => <li>{item}</li>)}</ul>;
}

export default ThreePartLayout;
