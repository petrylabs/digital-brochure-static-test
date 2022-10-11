import preval from "next-plugin-preval";
import { getLanguageVariables } from "../utils/api";

async function getGlobalVariablesData() {
  const languageVariables = await getLanguageVariables();

  return languageVariables;
}

export default preval(getGlobalVariablesData());
