import Head from "next/head";

/**
 * This is the site homepage.
 */

export default function IndexPage() {
  return (
    <>
      {/* CUSTOM PAGE HEAD */}

      <Head>
        <title>Home page</title>
      </Head>

      {/* PAGE TEMPLATE */}

      <h1>Hello world</h1>
    </>
  );
}
