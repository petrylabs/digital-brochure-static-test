import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { GTMContainerId } from "../config";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Google Tag Manager -- keep as high as possible in the <head> of the page */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTMContainerId}');`,
          }}
        />
        <script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>

        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <body>
        {/* Google Tag Manager -- keep this immediately after opening <body> tag */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTMContainerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
