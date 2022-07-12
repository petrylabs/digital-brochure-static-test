import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

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

export async function getStaticProps() {
  // TODO: fetch page data from dotCMS & return as props

  return {
    props: {
      temporaryPageTitle: "This is a landing page!",
    },
  };
}

/**
 * Landing page template
 */
function LandingPage(props) {
  const { temporaryPageTitle } = props;

  return (
    <>
      {/* CUSTOM PAGE HEAD */}

      <Head>
        <title>Landing page</title>
      </Head>

      {/* PAGE TEMPLATE */}

      <h1>{temporaryPageTitle}</h1>
    </>
  );
}

LandingPage.propTypes = {
  /** This is just a placeholder prop! To be removed when we have actual props */
  temporaryPageTitle: PropTypes.string.isRequired,
};

export default LandingPage;
