import { languageId, locales } from "../config";
import globalVariableData from "../site-data/globalVariables.preval";

export const getLanguageVariable = (key, lang) => {
  const contentData = globalVariableData[lang]?.data?.contentlets;
  if (contentData) {
    return contentData.find((x) => x.key.toLowerCase() == key.toLowerCase())
      ?.value;
  }
  return;
};

export const getLanguageId = (localeLang) => {
  return localeLang === locales.en ? languageId.en : languageId.fr;
};
