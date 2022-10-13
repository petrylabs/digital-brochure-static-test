import preval from "next-plugin-preval";
import { languageId, locales } from "../config";
import { getSearchResults } from "../utils/api";

async function getSearchResultData() {
  const searchResultDataEn = await getSearchResults();
  const searchResultDataFr = await getSearchResults(languageId.fr);

  return {
    [locales.en]: searchResultDataEn,
    [locales.fr]: searchResultDataFr,
  };
}

export default preval(getSearchResultData());
