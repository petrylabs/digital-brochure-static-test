import globalVariableData from "../site-data/globalVariables.preval";

export const getLanguageVariable = (key, lang) => {
  const contentData = globalVariableData[lang]?.data?.contentlets;
  if (contentData) {
    return contentData.find((x) => x.key.toLowerCase() == key.toLowerCase())
      ?.value;
  }
  return;
};
