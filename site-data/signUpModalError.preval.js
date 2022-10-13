import preval from "next-plugin-preval";
import { languageId, locales } from "../config";
import { getSignUpModalErrorContent, getPageContent } from "../utils/api";

async function getSignUpModalErrorData() {
  const { data: signUpModalErrorEnData } = await getSignUpModalErrorContent();
  const signUpModalErrorEn = getModalPageContent(signUpModalErrorEnData);

  const { data: signUpModalErrorFrData } = await getSignUpModalErrorContent(
    languageId.fr
  );
  const signUpModalErrorFr = getModalPageContent(signUpModalErrorFrData);

  return {
    [locales.en]: signUpModalErrorEn,
    [locales.fr]: signUpModalErrorFr,
  };
}

export default preval(getSignUpModalErrorData());

const getModalPageContent = (modalData) => {
  return getPageContent(
    modalData.entity.layout.body.rows,
    modalData.entity.containers
  ).filter((x) => Boolean(x));
};
