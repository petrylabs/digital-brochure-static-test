import preval from "next-plugin-preval";
import { getGaqModal } from "../utils/api";

async function getGaqModalData() {
  const gaqModalData = await getGaqModal();

  return gaqModalData;
}

export default preval(getGaqModalData());
