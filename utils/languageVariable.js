import globalVariableData from "../site-data/globalVariables.preval";

export const getLanguageVariable = (key) => {
  const contentData = globalVariableData?.data?.contentlets;
  console.log({ contentData, key });
  if (contentData) {
    return contentData.find((x) => x.key.toLowerCase() == key.toLowerCase())
      ?.value;
  }
  return;
};
