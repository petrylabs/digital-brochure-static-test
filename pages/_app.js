import Header from "../components/Header";
import "../scss/styles.scss";

/**
 * Structure for entire app!
 *
 * @param {*} props.Component Component representing a page (see `/pages`)
 * @param {*} props.pageProps Props for the Component
 */

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main id="main-content">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
