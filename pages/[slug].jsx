import React from "react";
import Head from "next/head";
import PropTypes, { object } from "prop-types";
import parse from "html-react-parser";

import { getPage } from "../utils/api";
import TextSection from "../components/TextSection";

export async function getStaticPaths() {
  // TODO: fetch page slugs from dotCMS
  const pageSlugs = [
    "auto-insurance",
    "condo-insurance",
    "home-insurance",
    "tenant-insurance",
  ];

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
    console.log("error loop");
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

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{description}</h1>

      {/* Intro */}
      <TextSection title={content[1].headline} copy={parse(content[1].copy)} />
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
