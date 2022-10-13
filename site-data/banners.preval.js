import preval from "next-plugin-preval";
import { getSiteBanners } from "../utils/api";
import { languageId, locales } from "../config";

async function getBanners() {
  const bannersEn = await getSiteBanners();
  const bannersFr = await getSiteBanners(languageId.fr);

  return {
    [locales.en]: bannersEn,
    [locales.fr]: bannersFr,
  };
}

export default preval(getBanners());
