import Head from "next/head";
import { getPage } from "../utils/api";
import CTAReminderSection from "../components/CTAReminderSection";

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
      content: data.content,
    },
  };
}

export default function IndexPage(props) {

  const { content } = props;

  return (
    <>
      {/* CUSTOM PAGE HEAD */}

      <Head>
        <title>Home page</title>
      </Head>

      {/* PAGE TEMPLATE */}

      {/* Get a Quote Section */}
      <CTAReminderSection content={content[0]} />
    </>
  );
}
