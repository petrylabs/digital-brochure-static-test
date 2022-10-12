import preval from "next-plugin-preval";
import { languageId, locales } from "../config";
import { getFormErrors } from "../utils/api";

async function getFormErrorsData() {
  const formErrorsDataEn = await getFormErrors();
  const formErrorsDataFr = await getFormErrors(languageId.fr);

  return {
    [locales.en]: formErrorsDataEn,
    [locales.fr]: formErrorsDataFr,
  };
}

export default preval(getFormErrorsData());
