import React, { useState } from "react";
import loadable from "@loadable/component";

import ModalContext from "../context/modal";
import Header from "../components/Header";
import "../scss/styles.scss";

const Footer = loadable(() => import("../components/Footer"));
const Modal = loadable(() => import("../components/Modal"));
const QuoteModalContent = loadable(() =>
  import("../components/QuoteModalContent")
);

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

      <Footer />

      <Modal open={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)}>
        <QuoteModalContent />
      </Modal>
    </ModalContext.Provider>
  );
}

export default CustomApp;
