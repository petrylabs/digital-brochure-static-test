import preval from "next-plugin-preval";
import { getHeader } from "../utils/api";
import { languageId, locales } from "../config";

async function getHeaderData() {
  const headerEnglishData = await getHeader(languageId.en);
  const headerFrenchData = await getHeader(languageId.fr);
  return {
    [locales.en]: headerEnglishData.data,
    [locales.fr]: headerFrenchData.data,
  };
}

export default preval(getHeaderData());
