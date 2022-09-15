import { createContext } from "react";

/**
 * Context for managing page related footer data across the app
 */
const PageFooterContext = createContext({
  pageFooterData: [],
  setPageFooterData: () => {},
});

export default PageFooterContext;
