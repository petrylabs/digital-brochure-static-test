import Head from "next/head";
import { getPage } from "../utils/api";
import SplitLayout from "../components/SplitLayout";

/**
 * This is the site homepage.
 */

export async function getStaticProps({ params }) {
  // const { slug } = params;
  const { data } = await getPage();

  // TO DO: create 404 and redirect to it
  // if (!data) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //     },
  //   };
  // }

  return {
    props: {
      title: data.title,
      seodescription: data.seodescription,
      description: data.description,
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
      <section className="bg-white">
        <SplitLayout content={content[16]} imageRight />
      </section>
    </>
  );
}
