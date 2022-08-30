import React from "react";
import Head from "next/head";
import PropTypes, { object } from "prop-types";
import parse from "html-react-parser";

import { getPage } from "../utils/api";
import TextSection from "../components/TextSection";
import { pageSlugs } from "../config";
import SplitLayout from "../components/SplitLayout";
import PageHero from "../components/PageHero";
import TestimonialCarousel from "../components/TestimonialCarousel";

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

  /* Filter out Nissan section for auto page only: */
  const nissanSection = content.find((section) =>
    section?.headline?.includes("Nissan")
  );
  const commonContent = content.filter(
    (section) => !section?.headline?.includes("Nissan")
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {/* Page Hero */}
      <PageHero content={commonContent[0]} />

      {/* Intro */}
      <TextSection
        title={commonContent[1].headline}
        copy={parse(commonContent[1].copy)}
      />

      {/* Section 3 */}
      <section className="bg-white">
        <SplitLayout content={commonContent[2]} />
      </section>
      {/* Section 4 */}
      {/* Why buy Section (5) */}
      {/* Partnership Section (6) */}
      {/* Section 7 */}
      <section className="bg-white">
        <SplitLayout
          content={content[8]}
          hideImageOnMobile={true}
          imageRight={true}
        />
      </section>
      {/* How much Section (8) */}
      {/* How can I save Section (9) */}
      {/* Testimonial carousel Section (10) */}
      <TestimonialCarousel content={commonContent[11]} />
      {/* Blog/FAQ Section (11) */}
      {/* Section 12 */}
      {/* Last Section (13) */}
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
