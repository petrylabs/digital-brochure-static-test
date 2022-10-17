import preval from "next-plugin-preval";
import { languageId, locales } from "../config";

import { getSignUpModalSuccessContent } from "../utils/api";

async function getSignUpModalSuccessData() {
  const signUpModalSuccessDataEn = await getSignUpModalSuccessContent();
  const signUpModalSuccessDataFr = await getSignUpModalSuccessContent(
    languageId.fr
  );

  return {
    [locales.en]: signUpModalSuccessDataEn,
    [locales.fr]: signUpModalSuccessDataFr,
  };
}

export default preval(getSignUpModalSuccessData());
