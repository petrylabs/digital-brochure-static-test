import React, { useState } from "react";
import { breakpoints } from "../../config";
import useWindowWidth from "../../hooks/useWindowWidth";

/**
 * Search Input
 * Page header; container for navigation elements
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43178917935/SearchInput
 */

function SearchInput() {
  const [isExpanded, setIsExpanded] = useState(false);

  /* Handling screen sizes: */
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;
  const isDesktop = screenWidth >= breakpoints.lg;

  return (
    <>
      <div>
        {isDesktop && (
          <div>
            <button
              type="button"
              onMouseEnter={() => setIsExpanded(true)}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-controls="expanded-panel"
              aria-expanded={isExpanded}
            >
              <div className="iconNavSearch"></div>
            </button>
          </div>
        )}
      </div>

      {isDesktop && isExpanded && <div id="expanded-panel">search panel</div>}
    </>
  );
}

export default SearchInput;
