import React, { useState } from "react";

import ModalContext from "../context/modal";
import Header from "../components/Header";
import Modal from "../components/Modal";
import footerData from "../site-data/footer.preval";
import "../scss/styles.scss";

/**
 * Structure for entire app!
 *
 * @param {*} props.Component Component representing a page (see `/pages`)
 * @param {*} props.pageProps Props for the Component
 */

function CustomApp({ Component, pageProps }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isQuoteModalOpen, setIsQuoteModalOpen }}>
      <Header />

      <main id="main-content">
        <Component {...pageProps} />
      </main>

      {/* Replace with footer component */}
      <pre>{JSON.stringify(footerData, null, 2)}</pre>

      <Modal open={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)}>
        <>Quote modal content!</>
      </Modal>
    </ModalContext.Provider>
  );
}

export default CustomApp;
