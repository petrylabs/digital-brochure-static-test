import Head from "next/head";

import { getPage } from "../utils/api";
import CTAReminderSection from "../components/CTAReminderSection";
import PageHero from "../components/PageHero";
import SplitLayout from "../components/SplitLayout";
import BlogFaqSection from "../components/BlogFaqSection";
import TwoAccordionSection from "../components/TwoAccordionSection"
import SignUpSection from "../components/SignUpSection"

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
  return (
    <>
      {/* CUSTOM PAGE HEAD */}

      <Head>
        <title>{title}</title>
      </Head>

      {/* PAGE TEMPLATE */}

      {/* Page hero */}
      <PageHero content={content[0]} />

      {/* "Switch and Save" section */}
      <section className="bg-white">
        <SplitLayout content={content[4]} hideImageOnMobile imageRight />
      </section>

      {/* Blog Section */}
      <BlogFaqSection content={content[9]} blogs={[content[10], content[11], content[12]]} />

      {/* Sign up section */}
      <SignUpSection content={content[13]} />

      {/* Canadian insurance accordion section*/}
      <TwoAccordionSection
        content={content[14]}
        leftRightAccordianContent={content[15].fields}
      />

      {/* "When it comes to..." section */}
      <section className="bg-white">
        <SplitLayout content={content[16]} imageRight />
      </section>

      {/* CTA reminder */}
      <CTAReminderSection content={content[0]} />
    </>
  );
}
