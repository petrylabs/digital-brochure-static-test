import preval from "next-plugin-preval";

import { getSignUpModalSuccessContent } from "../utils/api";

async function getSignUpModalSuccessData() {
  const signUpModalSuccessData = await getSignUpModalSuccessContent();

  return signUpModalSuccessData;
}

export default preval(getSignUpModalSuccessData());
