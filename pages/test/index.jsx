import LargeScreenImage from "../../components/LargeScreenImage";
import ThreeItemLayout from "../../components/ThreeItemLayout";
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
