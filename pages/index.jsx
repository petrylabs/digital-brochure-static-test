import { React, useEffect, useContext } from "react";
import Head from "next/head";

import { locales } from "../config";
import { getPage } from "../utils/api";
import BlogFaqSection from "../components/BlogFaqSection";
import CTAReminderSection from "../components/CTAReminderSection";
import InfoCard from "../components/InfoCard";
import PageFooterContext from "../context/pageFooter";
import PageHero from "../components/PageHero";
import PartnershipSection from "../components/PartnershipSection";
import SectionSix from "../components/SectionSix";
import SignUpSection from "../components/SignUpSection";
import SplitLayout from "../components/SplitLayout";
import ThreeItemLayout from "../components/ThreeItemLayout";
import TrustPilot from "../components/TrustPilot";
import TwoAccordionSection from "../components/TwoAccordionSection";
import LanguageContext from "../context/language";
import faviconsPreval from "../site-data/favicons.preval";

/**
 * This is the site homepage in English.
 * French homepage uses same template, but is rendered from `fr.jsx`
 */

export async function getStaticProps() {
  const { data } = await getPage();

  if (!data) {
    return {
      // Todo: redirect to 404 page
    };
  }

  return {
    props: {
      favicons: faviconsPreval[locales.en],
      title: data.title,
      canonicalUrl: data.canonicalUrl,
      seodescription: data.seodescription,
      content: data.content,
      pageLang: locales.en,
    },
  };
}

export default function IndexPage(props) {
  const { setLanguage } = useContext(LanguageContext);
  const { title, content, pageLang } = props;
  /* Handle page footer content: */
  const { pageFooterData, setPageFooterData } = useContext(PageFooterContext);
  const legalFooterContent = content.filter(
    (x) => x.contentType === "LegalFooter"
  );
  setLanguage(pageLang);

  useEffect(() => {
    setPageFooterData(legalFooterContent);
  }, []); // empty array, to run once after component mounts

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {/* Page hero */}
      <PageHero content={content[0]} imgContain />

      {/* Trust Pilot Section */}
      <TrustPilot />

      {/* "Buy Insurance Securely" section */}
      <section className="bg-white">
        <SplitLayout content={content[2]} imageRight />
        <div className="container" style={{ paddingBottom: "13px" }}>
          <ThreeItemLayout>
            <InfoCard
              title={content[3].fields[0].generic1.headline}
              iconUrl={content[3].fields[0].generic1.icon.url}
              alt={content[3].fields[0].generic1.icon.altText}
              content={content[3].fields[0].generic1.copy}
              withBorder
            />
            <InfoCard
              title={content[3].fields[0].generic2.headline}
              iconUrl={content[3].fields[0].generic2.icon.url}
              alt={content[3].fields[0].generic2.icon.altText}
              content={content[3].fields[0].generic2.copy}
              withBorder
            />
            <InfoCard
              title={content[3].fields[0].generic3.headline}
              iconUrl={content[3].fields[0].generic3.icon.url}
              alt={content[3].fields[0].generic3.icon.altText}
              content={content[3].fields[0].generic3.copy}
              withBorder
            />
          </ThreeItemLayout>
        </div>
      </section>

      {/* "Switch and Save" section */}
      <section className="bg-white">
        <SplitLayout content={content[4]} hideImageOnMobile imageRight />
      </section>

      {/* Partnership Section */}
      <PartnershipSection content={content[5]} />

      {/* Section 6 (for content items 6,7,8) */}
      <SectionSix content={content} />

      {/* Blog Section */}
      <BlogFaqSection
        content={content[9]}
        blogs={[content[10], content[11], content[12]]}
      />

      {/* Sign up section */}
      {/* <SignUpSection content={content[13]} /> */}

      {/* Canadian insurance accordion section*/}
      <TwoAccordionSection
        content={content[14]}
        leftRightAccordianContent={content[15]?.fields}
        bgWhite
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
