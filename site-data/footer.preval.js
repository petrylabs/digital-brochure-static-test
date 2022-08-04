import preval from "next-plugin-preval";
import { getFooter } from "./api";

async function getFooterData() {
  const footerData = await getFooter();

  return footerData;
}

export default preval(getFooterData());
