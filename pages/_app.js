import React, { useEffect, useRef, useState } from "react";
import loadable from "@loadable/component";
import { useRouter } from "next/router";

import ModalContext from "../context/modal";
import PageFooterContext from "../context/pageFooter";
import LanguageContext from "../context/language";
import Header from "../components/Header";
import "../scss/styles.scss";
import { locales } from "../config";
import getSignUpModalSuccessData from "../site-data/signUpModalSuccess.preval";
import getSignUpModalErrorData from "../site-data/signUpModalError.preval";
import { getCurrentPath, removeStorage } from "../utils";
import { newsLetterFormKey } from "../config";
import SiteBanners from "../components/SiteBanners";

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
  const [pageFooterData, setPageFooterData] = useState(null); // the lifted state
  const [lang, setLanguage] = useState(locales.fr);

  /* Modal management: */
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignUpErrorModalOpen, setIsSignUpErrorModalOpen] = useState(false);
  const [isSignUpSuccessModalOpen, setIsSignUpSuccessModalOpen] =
    useState(false);
  const signUpModalSuccessData = getSignUpModalSuccessData[lang]?.data;
  const signUpModalSuccessContent =
    signUpModalSuccessData && Array.isArray(signUpModalSuccessData.content)
      ? signUpModalSuccessData.content[0]
      : null;
  const signUpModalErrorContent =
    getSignUpModalErrorData[lang] &&
    Array.isArray(getSignUpModalErrorData[lang])
      ? getSignUpModalErrorData[lang][0]
      : null;

  /* Language management: */
  const router = useRouter();
  useEffect(() => {
    const currentPath = getCurrentPath(router);
    setLanguage(currentPath?.query?.locale);
  }, []);

  /* Handle header positioning below SiteBanners (if any) */
  const [pageOffset, setPageOffset] = useState(0);

  /* Locking page scroll (behind mobile nav, modals, etc) */
  const [scrollLocked, setScrollLocked] = useState(false);
  useEffect(() => {
    if (
      isQuoteModalOpen ||
      isSignUpModalOpen ||
      isSignUpErrorModalOpen ||
      isSignUpSuccessModalOpen
    ) {
      setScrollLocked(true);
    } else {
      setScrollLocked(false);
    }
  });

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
          <Header banners={<SiteBanners setHeight={setPageOffset} />} />

          {/* `main` and Footer position are affected by presence of banners */}
          <div
            style={{
              position: scrollLocked ? "fixed" : "relative",
              top: `${pageOffset + 64}px`,
            }}
          >
            <main id="main-content">
              {/* Page content gets displayed in here: */}
              <Component {...pageProps} />
            </main>

            <Footer />
          </div>

          {/* MODALS:  */}
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
