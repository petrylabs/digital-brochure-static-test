import Head from "next/head";

import { getPage } from "../utils/api";
import CTAReminderSection from "../components/CTAReminderSection";
import PageHero from "../components/PageHero";
import SplitLayout from "../components/SplitLayout";
import  ThreeItemLayout from "../components/ThreeItemLayout";
import BlogCard from "../components/BlogCard";

/**
 * This is the site homepage.
 */

export async function getStaticProps({}) {
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
console.log(content);
  return (
    <>
      {/* CUSTOM PAGE HEAD */}

      <Head>
        <title>{title}</title>
      </Head>

      {/* PAGE TEMPLATE */}

      {/* Page hero */}
      <PageHero content={content[0]} />

      {/* Blog Section */}
      <section>
        <h2>{content[9].headline}</h2>
        <ThreeItemLayout>
          <BlogCard content={content[10]}/>
          <BlogCard content={content[11]}/>
          <BlogCard content={content[12]}/>
          
        </ThreeItemLayout>
      </section>

      {/* "When it comes to..." section */}
      <section className="bg-white">
        <SplitLayout content={content[16]} imageRight />
      </section>

      {/* CTA reminder */}
      <CTAReminderSection content={content[0]} />
    </>
  );
}
