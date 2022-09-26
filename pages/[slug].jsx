import React, { useEffect, useContext } from "react";
import Head from "next/head";
import PropTypes, { object } from "prop-types";

import BlogFaqSection from "../components/BlogFaqSection";
import CTAReminderSection from "../components/CTAReminderSection";
import PageHero from "../components/PageHero";
import PartnershipSection from "../components/PartnershipSection";
import SplitLayout from "../components/SplitLayout";
import TestimonialCarousel from "../components/TestimonialCarousel";
import TextSection from "../components/TextSection";
import ThreeColumnsSection from "../components/ThreeColumnsSection";
import TwoAccordionSection from "../components/TwoAccordionSection";
import { routes } from "../config";
import PageFooterContext from "../context/pageFooter";
import { getPage } from "../utils/api";

export function getStaticPaths() {
  const paths = routes.map(({ path }) => ({ params: { slug: path } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const routeInfo = routes?.find((item) => item.path === slug);
  const { langId, locale, pageId } = routeInfo.query;
  const { data } = await getPage(langId, pageId);

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
      pageLang: locale,
    },
  };
}

/**
 * Landing page template
 */
function LandingPage(props) {
  const { title, description, seodescription, content, slug } = props;

  /* Handle page footer content: */
  const { pageFooterData, setPageFooterData } = useContext(PageFooterContext);
  const legalFooterContent = content.filter(
    (x) => x.contentType === "LegalFooter"
  );
  useEffect(() => {
    setPageFooterData(legalFooterContent);
  }, []); // empty array, to run once after component mounts

  /* Filter out Nissan section for auto page only: */
  const autoInsurancePage = slug === ("auto-insurance" || "assurance-auto");
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
        copy={commonContent[1].copy}
      />

      {/* Section 3 */}
      <section className="bg-white">
        <SplitLayout content={commonContent[2]} />
      </section>

      {/* Section 4 */}
      <TwoAccordionSection
        content={content[3]}
        leftRightAccordianContent={content[4]?.fields}
      />

      {/* Why buy Section (5) */}
      <ThreeColumnsSection
        introContent={commonContent[5]}
        columnContent={commonContent[6]}
        className="bg-white"
      />

      {/* Partnership Section (6) */}
      {autoInsurancePage && <PartnershipSection content={nissanSection} />}

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

      {/* CTA Reminder */}
      <CTAReminderSection content={commonContent[18]} />
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
