import React from "react";
import Head from "next/head";
import PropTypes, { object } from "prop-types";
import parse from "html-react-parser";
import { getPage } from "../utils/api";
import TextSection from "../components/TextSection";
import { pageSlugs } from "../config";
import SplitLayout from "../components/SplitLayout";
import PageHero from "../components/PageHero";
import BlogFaqSection from "../components/BlogFaqSection";
import ThreeColumnsSection from "../components/ThreeColumnsSection";
import TestimonialCarousel from "../components/TestimonialCarousel";
import CTAReminderSection from "../components/CTAReminderSection";
import PartnershipSection from "../components/PartnershipSection"

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
      slug,
    },
  };
}

/**
 * Landing page template
 */
function LandingPage(props) {
  const { title, description, seodescription, content, slug } = props;

  const autoInsurancePage = slug === ('auto-insurance' || 'assurance-auto');

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
      <ThreeColumnsSection
        introContent={commonContent[5]}
        columnContent={commonContent[6]}
        className="bg-white"
      />
      {/* Partnership Section (6) */}
      {autoInsurancePage && (<PartnershipSection content={nissanSection} />)}

      {/* Section 7 */}
      <section>
        <SplitLayout content={commonContent[7]} hideImageOnMobile imageRight />
      </section>

      {/* How much Section (8) */}
      <section className="bg-white">
        <SplitLayout content={commonContent[8]} />
      </section>

      {/* How can I save Section (9) */}
      <ThreeColumnsSection
        introContent={commonContent[9]}
        columnContent={commonContent[10]}
      />
      {/* Testimonial carousel Section (10) */}
      <TestimonialCarousel content={commonContent[11]} />

      {/* Blog/FAQ Section (11) */}
      <BlogFaqSection
        content={commonContent[12]}
        blogs={[commonContent[13], commonContent[14], commonContent[15]]}
        faq={commonContent[16]}
      />

      {/* Section 12 */}
      <section>
        <SplitLayout content={commonContent[17]} hideImageOnMobile />
      </section>
      {/* Get a Quote Section (13) */}
      <CTAReminderSection content={content[0]} />
    </>
  );
}

LandingPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  seodescription: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(object),
  slug: PropTypes.string.isRequired,
};

export default LandingPage;
