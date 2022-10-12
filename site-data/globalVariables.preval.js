import preval from "next-plugin-preval";
import { languageId, locales } from "../config";
import { getLanguageVariables } from "../utils/api";

async function getGlobalVariablesData() {
  const languageVariablesEn = await getLanguageVariables();
  const languageVariablesFr = await getLanguageVariables(languageId.fr);

  return {
    [locales.en]: languageVariablesEn,
    [locales.fr]: languageVariablesFr,
  };
}

export default preval(getGlobalVariablesData());
