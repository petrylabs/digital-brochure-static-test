import preval from "next-plugin-preval";
import { languageId, locales } from "../config";
import { getGaqModal } from "../utils/api";

async function getGaqModalData() {
  const gaqModalDataEn = await getGaqModal();
  const gaqModalDataFr = await getGaqModal(languageId.fr);

  return {
    [locales.en]: gaqModalDataEn,
    [locales.fr]: gaqModalDataFr,
  };
}

export default preval(getGaqModalData());
