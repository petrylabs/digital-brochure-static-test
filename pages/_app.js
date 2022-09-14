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

//Todo: added this as a dummy modal will replace it once the actual modal is ready.
//Tested the same the modal is opening.
function SignUpModal() {
  return <div>hello World</div>;
}

/**
 * Structure for entire app!
 *
 * @param {*} props.Component Component representing a page (see `/pages`)
 * @param {*} props.pageProps Props for the Component
 */

function CustomApp({ Component, pageProps }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
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

      <Modal open={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)}>
        <QuoteModalContent />
      </Modal>

      <Modal
        open={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      >
        <SignUpModal />
      </Modal>
    </ModalContext.Provider>
  );
}

export default CustomApp;
