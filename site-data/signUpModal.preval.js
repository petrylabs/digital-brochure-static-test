import preval from "next-plugin-preval";
import { getSignUpModal } from "../utils/api";

async function getSignUpModalData() {
  const signUpModalData = await getSignUpModal();

  return signUpModalData;
}

export default preval(getSignUpModalData());
