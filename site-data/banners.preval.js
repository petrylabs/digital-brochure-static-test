import preval from "next-plugin-preval";
import { getSiteBanners } from "../utils/api";

async function getBanners() {
  const banners = await getSiteBanners();

  return banners;
}

export default preval(getBanners());
