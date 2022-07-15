import TextSection from "../../components/TextSection/index"; 
import React, { useState } from "react";
import parse from "html-react-parser";

import Modal from "../../components/Modal";
import LargeScreenImage from "../../components/LargeScreenImage";
import InfoCard from "../../components/InfoCard";
import ThreeItemLayout from "../../components/ThreeItemLayout";
import placeholderImage from "./placeholder.jpg";

const data = [ { 
  "title": "Auto Insurance / INTRO", 
  "baseType": "CONTENT", 
  "archived": false, 
  "copy": "<p>Getting insured has never been easier with Canada&rsquo;s first online car insurance company. If you live in <a href=\"/auto-insurance/alberta\" target=\"_self\" class=\"\" title=\"Auto Insurance Ontario\">Alberta</a>, <a href=\"/auto-insurance/ontario\" target=\"_self\" class=\"\" hidden-title=\"\" title=\"Auto Insurance Ontario\">Ontario</a>, <a href=\"/auto-insurance/quebec\" target=\"_self\" class=\"\" hidden-title=\"\" title=\"Auto Insurance Qu&eacute;bec\">Québec</a>, New Brunswick, Nova Scotia or P.E.I., you can get a quick quote and buy car insurance online in just a few clicks. Get customized coverage, in language you can understand, at a competitive price &ndash; and do it all online. We&rsquo;ve changed car insurance for the better, so you can worry less and live more.</p>", 
  "headline": "Get a free car insurance quote and buy online instantly", 
} ]; 

const htmlCopy = `<p>Do you lease or finance your vehicle? Having both comprehensive and collision coverage may actually be required by your lender. <snt-link href=\"https://www.sonnet.ca/blog/auto/insurance/lease-finance-insurance\" target=\"_self\"><a href=\"https://www.sonnet.ca/blog/lease-finance-insurance\" title=\"Find out more about insuring a leased or financed car\">Find out more about insuring a leased or financed car</a></snt-link>.</p>`;
const parsedCopy = parse(htmlCopy);

/**
 * This is a TEST PAGE for UI components.
 * To be deleted before release.
 */
export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h1>UI TEST PAGE</h1>

      <h2>ThreeItemLayout &amp; InfoCard:</h2>
      <ThreeItemLayout>
        <InfoCard
          iconUrl={"https://www.sonnet.ca/dA/6b63420edd/scrollAndFeather.svg"}
          title={"Hello World"}
          content={parsedCopy}
        ></InfoCard>
        <InfoCard
          iconUrl={"https://www.sonnet.ca/dA/6b63420edd/scrollAndFeather.svg"}
          title={"Hello World"}
          content={parsedCopy}
          withBorder={false}
        ></InfoCard>
        <InfoCard
          iconUrl={"https://www.sonnet.ca/dA/6b63420edd/scrollAndFeather.svg"}
          title={"Hello World"}
          content={parsedCopy}
        ></InfoCard>
        <div>This child will not be displayed!</div>
      </ThreeItemLayout>

      <h2>Modal</h2>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>Modal content!</>
      </Modal>

      <h2>LargeScreenImage:</h2>
      <p>The image below will only be shown on screens &gt; 767px wide.</p>
      <LargeScreenImage src={placeholderImage} width="400" height="300" />

      <h2>TextSection</h2>
      <TextSection data={data} /> 
    </>
  );
}
