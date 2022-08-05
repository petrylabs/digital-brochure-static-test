import { useEffect, useState } from "react";

import { getWindow } from "../utils/window";

/**
 * UseScrolledPast
 *
 * Returns boolean indication whether the user has scrolled past a given scroll position
 * @param {number} initialScrollPosition
 */

export function useScrolledPast(initialScrollPosition = 0) {
  const [isScrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const window = getWindow();
    const onScroll = (e) => {
      if (initialScrollPosition < e.target.documentElement.scrollTop) {
        setScrolledPast(true);
      } else {
        setScrolledPast(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [initialScrollPosition]);

  return isScrolledPast;
}

export default useScrolledPast;
