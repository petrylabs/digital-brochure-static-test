import React from "react";
import Head from "next/head";
import PropTypes, { object } from "prop-types";
import parse from "html-react-parser";

import { getPage } from "../utils/api";
import TextSection from "../components/TextSection";
import { pageSlugs } from "../config";
import SplitLayout from "../components/SplitLayout";

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

  /* TEMPORARY: */
  console.log(content);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{description}</h1>

      {/* Intro */}
      <TextSection title={content[1].headline} copy={parse(content[1].copy)} />

      {/* Section 3 */}
      <section>
        <SplitLayout content={content[2]} />
      </section>
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
