import React from "react";
import Head from "next/head";
import PropTypes, { object } from "prop-types";
import { getPage } from "../utils/api";

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
  // TODO: fetch page data from dotCMS & return as props
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
      {/* CUSTOM PAGE HEAD */}

      <Head>
        <title>{title}</title>
      </Head>

      {/* PAGE TEMPLATE */}

      <h1>{description}</h1>

      <pre>{JSON.stringify(content, null, 2)}</pre>
    </>
  );
}

LandingPage.propTypes = {
  /** This is just a placeholder prop! To be removed when we have actual props */
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  seodescription: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(object),
};

export default LandingPage;
