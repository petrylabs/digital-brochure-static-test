import { React, useEffect, useContext } from "react";
import Head from "next/head";

import { getPage } from "../utils/api";
import CTAReminderSection from "../components/CTAReminderSection";
import PageHero from "../components/PageHero";
import SplitLayout from "../components/SplitLayout";
import BlogFaqSection from "../components/BlogFaqSection";
import TwoAccordionSection from "../components/TwoAccordionSection";
import SignUpSection from "../components/SignUpSection";
import InfoCard from "../components/InfoCard";
import LargeScreenImage from "../components/LargeScreenImage";
import ThreeItemLayout from "../components/ThreeItemLayout";
import { customLoader } from "../utils";
import { baseUrl, breakpoints } from "../config";
import PageFooterContext from "../context/pageFooter";
import TrustPilot from "../components/TrustPilot";

/**
 * This is the site homepage.
 */

export async function getStaticProps({ }) {
  const { data } = await getPage();

  if (!data) {
    return {
      // Todo: redirect to 404 page
    };
  }

  return {
    props: {
      title: data.title,
      content: data.content,
    },
  };
}

export default function IndexPage(props) {
  const { title, content } = props;

  /* Handle page footer content: */
  const { pageFooterData, setPageFooterData } = useContext(PageFooterContext);
  const legalFooterContent = content.filter(
    (x) => x.contentType === "LegalFooter"
  );
  useEffect(() => {
    setPageFooterData(legalFooterContent);
  }, []); // empty array, to run once after component mounts

  return (
    <>
      {/* CUSTOM PAGE HEAD */}

      <Head>
        <title>{title}</title>
      </Head>

      {/* PAGE TEMPLATE */}

      {/* Page hero */}
      <PageHero content={content[0]} />

      {/* Trust Pilot Section */}
      <TrustPilot />

      {/* "Switch and Save" section */}
      <section className="bg-white">
        <SplitLayout content={content[4]} hideImageOnMobile imageRight />
      </section>

      {/* Section 6 */}
      <section className="container bg-white">
        <ThreeItemLayout>
          <InfoCard
            title={content[6].headline}
            iconUrl={content[6].fields[0].icon.url}
            alt={content[6].fields[0].icon.altText}
            content={content[6].copy}
            withBorder={true}
          />
          <InfoCard
            title={content[7].headline}
            iconUrl={content[7].fields[0].icon.url}
            alt={content[7].fields[0].icon.altText}
            content={content[7].copy}
            withBorder={true}
          />
          <LargeScreenImage
            src={`${baseUrl}${content[8].fileAsset}`}
            layout="fill"
            objectFit="cover"
            loader={customLoader}
            breakpoint={breakpoints.lg}
          />
        </ThreeItemLayout>
      </section>

      {/* Blog Section */}
      <BlogFaqSection
        content={content[9]}
        blogs={[content[10], content[11], content[12]]}
      />

      {/* Sign up section */}
      <SignUpSection content={content[13]} />

      {/* Canadian insurance accordion section*/}
      <TwoAccordionSection
        content={content[14]}
        leftRightAccordianContent={content[15]?.fields}
      />

      {/* "When it comes to..." section */}
      <section className="bg-white">
        <SplitLayout content={content[16]} imageRight />
      </section>

      {/* CTA reminder */}
      <CTAReminderSection content={content[17]} />
    </>
  );
}
