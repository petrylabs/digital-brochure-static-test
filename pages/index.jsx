import Head from "next/head";
import { getPage } from "../utils/api";
import CTAReminderSection from "../components/CTAReminderSection";
import SplitLayout from "../components/SplitLayout";

/**
 * This is the site homepage.
 */

export async function getStaticProps({}) {
  const { data } = await getPage();

  if (!data) {
    return {
      // Todo: add the modal for 404 page
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

      {/* When it comes to section */}
      <section className="bg-white">
        <SplitLayout content={content[16]} imageRight />
      </section>
      {/* Get a Quote Section */}
      <CTAReminderSection content={content[0]} />
    </>
  );
}
