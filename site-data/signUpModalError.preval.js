import preval from "next-plugin-preval";
import { getSignUpModalErrorContent, getPageContent } from "../utils/api";

async function getSignUpModalErrorData() {
  const { data } = await getSignUpModalErrorContent();

  const { layout, containers, page } = data.entity;
  const content = getPageContent(layout.body.rows, containers).filter((x) =>
    Boolean(x)
  );

  return content;
}

export default preval(getSignUpModalErrorData());
