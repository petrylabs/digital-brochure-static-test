import React, { useEffect, useContext } from "react";
import Head from "next/head";
import PropTypes, { object } from "prop-types";

import BlogFaqSection from "../components/BlogFaqSection";
import CTAReminderSection from "../components/CTAReminderSection";
import PageHero from "../components/PageHero";
import ThreeItemLayout from "../components/ThreeItemLayout";
import IconCopy from "../components/IconCopy";
import SplitLayout from "../components/SplitLayout";
import TestimonialCarousel from "../components/TestimonialCarousel";
import TextSection from "../components/TextSection";
import TwoAccordionSection from "../components/TwoAccordionSection";
import { landingPageRoutes } from "../config";
import PageFooterContext from "../context/pageFooter";
import { getPage } from "../utils/api";
import LanguageContext from "../context/language";
import faviconsPreval from "../site-data/favicons.preval";
export function getStaticPaths(params) {
    
    const paths = landingPageRoutes
    .filter((route) => {
        const slug = route.query.pageId.split('/');
        return slug.length >= 2;
    })
    .map(({ path }) => {
        const slugPieces = path.split('/');
        return {
            params: { slug: slugPieces },
          }
    });
    
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const routeInfo = landingPageRoutes?.find((item) => item.path === slug.join('/'));
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
        favicons: faviconsPreval[locale],
        title: data.title,
        seodescription: data.seodescription,
        canonicalUrl: data.canonicalUrl,
        description: data.description,
        content: data.content,
        slug,
        pageLang: locale,
      },
    };
  }

function TestLandingPage(props) {
    const { setLanguage } = useContext(LanguageContext);
    const { title, description, seodescription, content, slug } = props;
    const routeInfo = landingPageRoutes?.find((item) => item.path === slug.join('/'));
    /* Handle page footer content: */
    const { pageFooterData, setPageFooterData } = useContext(PageFooterContext);
    const legalFooterContent = content.filter(
      (x) => x.contentType === "LegalFooter"
    );
  
    useEffect(() => {
      setLanguage(routeInfo.query.locale);
      setPageFooterData(legalFooterContent);
    }, []); // empty array, to run once after component mounts
  
    /* Filter out Nissan section for auto page only: */
    const autoInsurancePage =
      slug === "auto-insurance" || slug === "assurance-auto";
    const nissanSection = content.find(
      (section) => section?.title === "Nissan Promotion / Auto Landing Page"
    );
    const commonContent = content.filter(
      (section) => section?.title !== "Nissan Promotion / Auto Landing Page"
    );
    
    commonContent[5].fields.push(commonContent[5].fields[0]);

    // console.log(commonContent[5])

    return (
        <>
        <Head>
            <title>{title}</title>
        </Head>

        {/* Page Hero */}
        <PageHero content={commonContent[0]} />

        {/* Intro Body */}
        <TextSection
            title={commonContent[1].headline}
            copy={commonContent[1].copy}
        />

        {/* Two Column Image Left */}
        <section className="bg-white">
            <SplitLayout content={commonContent[2]} />
        </section>

        {/* Intro with Two Column Accordion */}
        <TwoAccordionSection
            content={content[3]}
            leftRightAccordianContent={content[4]?.fields}
        />

        {/* Testimonial carousel Section (5) */}
        <TestimonialCarousel content={commonContent[5]} />

        {/* Two Column Image Left */}
        <section className="bg-white">
            <SplitLayout imageRight={true} content={commonContent[6]} />
        </section>

        

        {/* How can I save Section (9) */}

        <section className="bg-white">
            <TextSection
                title={commonContent[7].headline}
                copy={commonContent[7].copy}
            />
            <div className="container" style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                <ThreeItemLayout>
                    <IconCopy
                        title={commonContent[8].fields[0].headline}
                        iconUrl={commonContent[8].fields[0].tabletLogo.url}
                        alt={commonContent[8].fields[0].icon.altText}
                        content={commonContent[8].fields[0].copy}
                        withBorder
                    />
                    <IconCopy
                        title={commonContent[9].fields[0].headline}
                        iconUrl={commonContent[9].fields[0].tabletLogo.url}
                        alt={commonContent[9].fields[0].icon.altText}
                        content={commonContent[9].fields[0].copy}
                        withBorder
                    />
                </ThreeItemLayout>
            </div>
        </section>

        {/* Blog/FAQ Section (11) */}
        <BlogFaqSection
            content={commonContent[11]}
            blogs={[commonContent[12], commonContent[13], commonContent[14]]}
            faq={commonContent[15]}
        />

        {/* Two Column Image Left */}
        <section className="bg-white">
            <SplitLayout content={commonContent[16]} />
        </section>

        {/* CTA Reminder */}
        <CTAReminderSection content={commonContent[17]} />

        </>
    )
}

export default TestLandingPage