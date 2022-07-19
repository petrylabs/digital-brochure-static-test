import React, { useState } from "react";
import parse from "html-react-parser";
import Modal from "../../components/Modal";
import InfoCard from "../../components/InfoCard";
import ThreeItemLayout from "../../components/ThreeItemLayout";
import CTA from "../../components/CTA";
import SplitLayout from "../../components/SplitLayout";
import LargeScreenImage from "../../components/LargeScreenImage";
import placeholderImage from "./placeholder.jpg";
import Accordion from "../../components/Accordion";

function TestCopyComponent() {
  return (
    <>
      <h2>sunt aut facere repellat provident</h2>
      <div>
        quia et suscipit suscipit recusandae consequuntur expedita et cum
        reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt
        rem eveniet architecto
      </div>
    </>
  );
}
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

      <CTA url="https://www.wikipedia.org">primary link</CTA>
      <CTA url="https://www.wikipedia.org" type="secondary">
        secondary link
      </CTA>
      <br />
      <CTA>primary button</CTA>
      <CTA type="secondary">secondary button</CTA>

      <h2>Accordion</h2>
      <Accordion summary={<>Item 1</>} details={parsedCopy} />
      <Accordion summary={<>Item 2</>} details={parsedCopy} />
      <Accordion summary={<>Item 3</>} details={parsedCopy} />

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
      <br />
      <SplitLayout contentRight={true} imageSRC={placeholderImage}>
        <TestCopyComponent />
      </SplitLayout>

      <h2>Modal</h2>
      <CTA type="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </CTA>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>Modal content!</>
      </Modal>

      <h2>LargeScreenImage:</h2>
      <p>The image below will only be shown on screens &gt; 767px wide.</p>
      <LargeScreenImage src={placeholderImage} width="400" height="300" />
    </>
  );
}
