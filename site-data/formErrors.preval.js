import preval from "next-plugin-preval";
import { getFormErrors } from "../utils/api";

async function getFormErrorsData() {
  const formErrorsData = await getFormErrors();

  return formErrorsData;
}

export default preval(getFormErrorsData());
