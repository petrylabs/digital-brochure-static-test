import IndexPage from ".";
import { languageId, locales } from "../config";
import { getPage } from "../utils/api";

/**
 * This is the site homepage in French.
 */

export async function getStaticProps() {
  const { data } = await getPage(languageId.fr);

  if (!data) {
    return {
      // Todo: redirect to 404 page
    };
  }

  return {
    props: {
      title: data.title,
      content: data.content,
      pageLang: locales.fr,
    },
  };
}

export default function FrenchIndexPage(props) {
  return <IndexPage {...props} />;
}
