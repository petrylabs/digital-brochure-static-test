import IndexPage from ".";
import { languageId, locales } from "../config";
import faviconsPreval from "../site-data/favicons.preval";
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
      favicons: faviconsPreval[locales.fr],
      title: data.title,
      seodescription: data.seodescription,
      canonicalUrl: data.canonicalUrl,
      content: data.content,
      pageLang: locales.fr,
    },
  };
}

export default function FrenchIndexPage(props) {
  return <IndexPage {...props} />;
}
