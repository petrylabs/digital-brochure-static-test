import React, { useState } from "react";
import loadable from "@loadable/component";

import ModalContext from "../context/modal";
import PageFooterContext from "../context/pageFooter";
import LanguageContext from "../context/language";
import Header from "../components/Header";
import "../scss/styles.scss";

const Footer = loadable(() => import("../components/Footer"));
const Modal = loadable(() => import("../components/Modal"));
const QuoteModalContent = loadable(() =>
  import("../components/QuoteModalContent")
);
const SignUpModalContent = loadable(() =>
  import("../components/SignUpModalContent")
);

/**
 * Structure for entire app!
 *
 * @param {*} props.Component Component representing a page (see `/pages`)
 * @param {*} props.pageProps Props for the Component
 */

function CustomApp({ Component, pageProps }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [pageFooterData, setPageFooterData] = useState(null); // the lifted state

  // TEMPORARY LANGUAGE ASSIGNMENT
  // TODO: translation; provide dynamic value for `lang` when API is ready
  const lang = "en";

  return (
    <LanguageContext.Provider value={lang}>
      <PageFooterContext.Provider value={{ pageFooterData, setPageFooterData }}>
        <ModalContext.Provider
          value={{
            isQuoteModalOpen,
            setIsQuoteModalOpen,
            isSignUpModalOpen,
            setIsSignUpModalOpen,
          }}
        >
          <Header />

          <main id="main-content">
            <Component {...pageProps} />
          </main>

          <Footer />

          <Modal
            open={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
          >
            <QuoteModalContent />
          </Modal>

          <Modal
            open={isSignUpModalOpen}
            onClose={() => setIsSignUpModalOpen(false)}
          >
            <SignUpModalContent />
          </Modal>
        </ModalContext.Provider>
      </PageFooterContext.Provider>
    </LanguageContext.Provider>
  );
}

export default CustomApp;
