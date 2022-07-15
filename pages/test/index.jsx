import React, { useState } from "react";
import parse from "html-react-parser";
import Modal from "../../components/Modal";
import InfoCard from "../../components/InfoCard";
import ThreeItemLayout from "../../components/ThreeItemLayout";
import SplitLayout from "../../components/SplitLayout";
import LargeScreenImage from "../../components/LargeScreenImage";
import placeholderImage from "./placeholder.jpg";
import Image from "next/image";

function TestCopyComponent() {
  return (
    <>
      <h2>sunt aut facere repellat provident</h2>
      <div>quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto</div>
    </>
  )
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
      <SplitLayout contentRight={true}>
        <div>
          <Image src={placeholderImage} alt="placeholder image" width="100%" height="100%" layout="responsive" objectFit="cover" />
        </div>
        <TestCopyComponent />
      </SplitLayout>

      <h2>Modal</h2>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>Modal content!</>
      </Modal>

      <h2>LargeScreenImage:</h2>
      <p>The image below will only be shown on screens &gt; 767px wide.</p>
      <LargeScreenImage src={placeholderImage} width="400" height="300" />
    </>
  );
}
