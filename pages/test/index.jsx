import TextSection from "../../components/TextSection/index";
import React, { useState } from "react";
import Modal from "../../components/Modal";
import InfoCard from "../../components/InfoCard";
import ThreeItemLayout from "../../components/ThreeItemLayout";
import CTA from "../../components/CTA";
import LargeScreenImage from "../../components/LargeScreenImage";
import placeholderImage from "./placeholder.jpg";
import QuoteModalContent from "../../components/QuoteModalContent";
import NavCard from "../../components/NavCard";
import Accordion from "../../components/Accordion";
import AccordionGroup from "../../components/AccordionGroup";
import { searchData, getCookie, customLoader } from "../../utils";

const sampleHtml = `<p>Do you lease or finance your vehicle? Having both comprehensive and collision coverage may actually be required by your lender. <snt-link href=\"https://www.sonnet.ca/blog/auto/insurance/lease-finance-insurance\" target=\"_self\"><a href=\"https://www.sonnet.ca/blog/lease-finance-insurance\" title=\"Find out more about insuring a leased or financed car\">Find out more about insuring a leased or financed car</a></snt-link>.</p>`;

/**
 * This is a TEST PAGE for UI components.
 * To be deleted before release.
 */
export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  return (
    <>
      <h1>UI TEST PAGE</h1>
      <br />
      <CTA url="https://www.wikipedia.org">primary link</CTA>
      <CTA url="https://www.wikipedia.org" type="secondary">
        secondary link
      </CTA>
      <br />
      <CTA>primary button</CTA>
      <CTA type="secondary">secondary button</CTA>

      <h2>Accordion</h2>
      <AccordionGroup>
        <Accordion id={"1"} summary={<>Item 1</>} details={sampleHtml} />
        <Accordion id={"2"} summary={<>Item 2</>} details={sampleHtml} />
        <Accordion id={"3"} summary={<>Item 3</>} details={sampleHtml} />
      </AccordionGroup>

      <h2>ThreeItemLayout &amp; InfoCard:</h2>
      <ThreeItemLayout>
        <InfoCard
          iconUrl={"https://www.sonnet.ca/dA/6b63420edd/scrollAndFeather.svg"}
          title={"Hello World"}
          content={sampleHtml}
        ></InfoCard>
        <InfoCard
          iconUrl={"https://www.sonnet.ca/dA/6b63420edd/scrollAndFeather.svg"}
          title={"Hello World"}
          content={sampleHtml}
          withBorder={false}
        ></InfoCard>
        <InfoCard
          iconUrl={"https://www.sonnet.ca/dA/6b63420edd/scrollAndFeather.svg"}
          title={"Hello World"}
          content={sampleHtml}
        ></InfoCard>
        <div>This child will not be displayed!</div>
      </ThreeItemLayout>

      <h2>Modal</h2>
      <CTA type="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </CTA>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <QuoteModalContent />
      </Modal>

      <h2>LargeScreenImage:</h2>
      <p>The image below will only be shown on screens &gt; 767px wide.</p>
      <LargeScreenImage
        loader={customLoader}
        src={placeholderImage}
        width="400"
        height="300"
      />

      <h2>TextSection</h2>
      <TextSection
        titleString={"Get a free car insurance quote and buy online instantly"}
        copyString={sampleHtml}
      />

      <h2>Shopping cart value</h2>
      {getCookie("cart_number_of_quotes")}
      <h2>NavCard</h2>
      <NavCard
        url="https://www.sonnet.ca/auto-insurance"
        mainText="Auto"
        subText="Drive with peace of mind knowing you’re covered."
      />
      <NavCard
        url="https://www.sonnet.ca/pet-insurance"
        mainText="Pet"
        subText="Buy insurance online for your cat or dog."
        isNew
      />
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            console.log(searchData(search));
          }
        }}
      />
    </>
  );
}
