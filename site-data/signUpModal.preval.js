import preval from "next-plugin-preval";

import { languageId, locales } from "../config";
import { getSignUpModal } from "../utils/api";

async function getSignUpModalData() {
  const signUpModalDataEn = await getSignUpModal();
  const signUpModalDataFr = await getSignUpModal(languageId.fr);

  return {
    [locales.en]: signUpModalDataEn,
    [locales.fr]: signUpModalDataFr,
  };
}

export default preval(getSignUpModalData());
