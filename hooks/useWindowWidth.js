import { useEffect, useState } from "react";
import { debounce, getWindow } from "../utils";

/**
 * Returns width (in pixels) of window
 */
const useWindowWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const window = getWindow();

    if (window) {
      const handleWindowResize = debounce(
        () => setWidth(window.innerWidth),
        100
      );

      handleWindowResize();
      window.addEventListener("resize", handleWindowResize);

      return () => window.removeEventListener("resize", handleWindowResize);
    }

    return null;
  }, []);

  return width;
};

export default useWindowWidth;
