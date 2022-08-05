import preval from "next-plugin-preval";
import { getHeader } from "../utils/api";

async function getHeaderData() {
  const headerData = await getHeader();

  return headerData;
}

export default preval(getHeaderData());
