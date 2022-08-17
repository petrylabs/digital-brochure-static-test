import preval from "next-plugin-preval";
import { getSearchResults } from "../utils/api";

async function getSearchResultData() {
  const searchResultData = await getSearchResults();

  return searchResultData;
}

export default preval(getSearchResultData());
