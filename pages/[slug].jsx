import React from "react";
import Head from "next/head";
import PropTypes, { object } from "prop-types";

import { getPage } from "../utils/api";
import { pageSlugs } from "../config";
import { imageAlt, imageSrc } from "../utils/images";

export async function getStaticPaths() {
  const paths = pageSlugs.map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { data } = await getPage(slug);

  if (!data) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      title: data.title,
      seodescription: data.seodescription,
      description: data.description,
      content: data.content,
    },
  };
}

/**
 * Landing page template
 */
function LandingPage(props) {
  const { title, description, seodescription, content } = props;

  /** temporary: */
  const sectionThreeContent = content[2];

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{description}</h1>
      <pre>{JSON.stringify(sectionThreeContent, null, 2)}</pre>

      <article>
        <img
          src={`https://www.sonnet.ca/dA/${sectionThreeContent.fields["GenericContent.image"][0].identifier}/${sectionThreeContent.fields["GenericContent.image"][0].fileName}`}
        />
        <h2>{sectionThreeContent.headline}</h2>
        {sectionThreeContent.copy}
      </article>
    </>
  );
}

LandingPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  seodescription: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(object),
};

export default LandingPage;
