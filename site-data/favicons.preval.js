import preval from "next-plugin-preval";
import { languageId, locales } from "../config";
import { getFaviconIcons } from "../utils/api";

async function getFaviconIconsData() {
  const faviconIconsEnData = await getFaviconIcons();
  const faviconIconsFrData = await getFaviconIcons(languageId.fr);

  return {
    [locales.en]: faviconIconsEnData?.data?.contentlets[0]?.faviconIcons || [],
    [locales.fr]: faviconIconsFrData?.data?.contentlets[0]?.faviconIcons || [],
  };
}

export default preval(getFaviconIconsData());
