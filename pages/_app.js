import React, { useState } from "react";
import loadable from "@loadable/component";

import ModalContext from "../context/modal";
import PageFooterContext from "../context/pageFooter";
import LanguageContext from "../context/language";
import Header from "../components/Header";
import "../scss/styles.scss";
import { locales } from "../config";
import getSignUpModalSuccessData from "../site-data/signUpModalSuccess.preval";
import getSignUpModalErrorData from "../site-data/signUpModalError.preval";
import { removeStorage } from "../utils";
import { newsLetterFormKey } from "../config";

const Footer = loadable(() => import("../components/Footer"));
const Modal = loadable(() => import("../components/Modal"));
const QuoteModalContent = loadable(() =>
  import("../components/QuoteModalContent")
);
const SignUpModalContent = loadable(() =>
  import("../components/SignUpModalContent")
);
const ErrorContentModal = loadable(() =>
  import("../components/ErrorContentModal")
);
const SuccessContentModal = loadable(() =>
  import("../components/SuccessContentModal")
);

/**
 * Structure for entire app!
 * i.e. Components that "wrap" the page content and/or appear on any/all pages.
 *
 * @param {*} props.Component Component representing a page (see `/pages`)
 * @param {*} props.pageProps Props for the Component
 */

function CustomApp({ Component, pageProps }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignUpErrorModalOpen, setIsSignUpErrorModalOpen] = useState(true);
  const [isSignUpSuccessModalOpen, setIsSignUpSuccessModalOpen] =
    useState(false);
  const [pageFooterData, setPageFooterData] = useState(null); // the lifted state
  const [lang, setLanguage] = useState(locales.fr);
  console.log({ test: getSignUpModalSuccessData[lang] });
  console.log({ signUpModalErrorContent: getSignUpModalErrorData[lang] });
  const { data: signUpSuccessData } = getSignUpModalSuccessData[lang];
  const signUpModalSuccessContent = signUpSuccessData?.content[0];
  const signUpModalErrorContent = getSignUpModalErrorData[lang][0];
  console.log({ signUpModalSuccessContent });
  console.log({ signUpModalErrorContent });

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      <PageFooterContext.Provider value={{ pageFooterData, setPageFooterData }}>
        <ModalContext.Provider
          value={{
            isQuoteModalOpen,
            setIsQuoteModalOpen,
            isSignUpModalOpen,
            setIsSignUpModalOpen,
            isSignUpErrorModalOpen,
            setIsSignUpErrorModalOpen,
          }}
        >
          <Header />

          <main id="main-content">
            {/* Page content gets displayed in here: */}
            <Component {...pageProps} />
          </main>

          <Footer />

          <Modal
            open={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
            isQuoteModal
          >
            <QuoteModalContent />
          </Modal>

          <Modal
            open={isSignUpModalOpen}
            onClose={() => {
              setIsSignUpModalOpen(false);
              removeStorage(newsLetterFormKey);
            }}
          >
            <SignUpModalContent />
          </Modal>
          {signUpModalErrorContent && (
            <ErrorContentModal
              content={signUpModalErrorContent}
              open={isSignUpErrorModalOpen}
              onClose={() => {
                setIsSignUpErrorModalOpen(false);
                setIsSignUpModalOpen(true);
              }}
            />
          )}
          {signUpModalSuccessContent && (
            <SuccessContentModal
              content={signUpModalSuccessContent}
              open={isSignUpSuccessModalOpen}
              onClose={() => setIsSignUpSuccessModalOpen(false)}
            />
          )}
        </ModalContext.Provider>
      </PageFooterContext.Provider>
    </LanguageContext.Provider>
  );
}

export default CustomApp;
