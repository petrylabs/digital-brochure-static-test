import preval from "next-plugin-preval";
import { languageId, locales } from "../config";
import { getFooter } from "../utils/api";

async function getFooterData() {
  const footerEnData = await getFooter();
  const footerFrData = await getFooter(languageId.fr);

  return {
    [locales.en]: footerEnData,
    [locales.fr]: footerFrData,
  };
}

export default preval(getFooterData());
