import LargeScreenImage from "../../components/LargeScreenImage";
import ThreeItemLayout from "../../components/ThreeItemLayout";
import CTA from "../../components/CTA";
import placeholderImage from "./placeholder.jpg";

function TestComponent() {
  return <div style={{ backgroundColor: `#ccc` }}>This is a component</div>;
}

/**
 * This is a TEST PAGE for UI components.
 * To be deleted before release.
 */
export default function TestPage() {
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

      <h2>ThreeItemLayout:</h2>
      <ThreeItemLayout>
        <TestComponent />
        <TestComponent />
        <TestComponent />
        <div>This child will not be displayed!</div>
      </ThreeItemLayout>

      <h2>LargeScreenImage:</h2>
      <p>The image below will only be shown on screens &gt; 767px wide.</p>
      <LargeScreenImage src={placeholderImage} width="400" height="300" />
    </>
  );
}
