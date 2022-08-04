import "../scss/styles.scss";
import headerData from "../utils/header.preval";
import footerData from "../utils/footer.preval";

/**
 * Structure for entire app!
 *
 * @param {*} props.Component Component representing a page (see `/pages`)
 * @param {*} props.pageProps Props for the Component
 */

function CustomApp({ Component, pageProps }) {
  return (
    <main id="main-content">
      {/* Replace with header component */}
      <pre>{JSON.stringify(headerData, null, 2)}</pre>

      <Component {...pageProps} />

      {/* Replace with footer component */}
      <pre>{JSON.stringify(footerData, null, 2)}</pre>
    </main>
  );
}

export default CustomApp;
