import preval from "next-plugin-preval";
import { getRecaptchaSiteKey } from "../utils/api";

async function recaptchaSiteKeyData() {
  const siteKey = await getRecaptchaSiteKey();

  return siteKey;
}

export default preval(recaptchaSiteKeyData());
