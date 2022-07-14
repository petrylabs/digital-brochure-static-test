import ThreeItemLayout from "../components/ThreeItemLayout";
import InfoCard from "../components/InfoCard";
import parse from "html-react-parser";

function TestComponent() {
  return <div style={{ backgroundColor: `#ccc` }}>This is a component</div>;
}

const htmlCopy = `Do you lease or finance your vehicle? Having both comprehensive and collision coverage may actually be required by your lender.`;

/**
 * This is a TEST PAGE for UI components.
 * To be deleted before release.
 */
export default function TestPage() {
  return (
    <>
      <h1>UI TEST PAGE</h1>

      <ThreeItemLayout>
        <InfoCard
          iconUrl={"https://www.sonnet.ca/dA/6b63420edd/scrollAndFeather.svg"}
          title={"Hello World"}
          content={parse(htmlCopy)}
          withBorder
        ></InfoCard>
        <InfoCard
          iconUrl={"https://www.sonnet.ca/dA/6b63420edd/scrollAndFeather.svg"}
          title={"Hello World"}
          content={parse(htmlCopy)}
        ></InfoCard>
        <InfoCard
          iconUrl={"https://www.sonnet.ca/dA/6b63420edd/scrollAndFeather.svg"}
          title={"Hello World"}
          content={parse(htmlCopy)}
          withBorder
        ></InfoCard>
        <div>This child will not be displayed!</div>
      </ThreeItemLayout>
    </>
  );
}
