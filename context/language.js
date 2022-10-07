import { createContext } from "react";

/**
 * Context for managing the language across the app
 */
const LanguageContext = createContext();
LanguageContext.displayName = "LanguageContext";

export default LanguageContext;
