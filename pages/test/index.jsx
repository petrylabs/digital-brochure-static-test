import ThreeItemLayout from "../../components/ThreeItemLayout";
import SplitLayout from "../../components/SplitLayout";
import LargeScreenImage from "../../components/LargeScreenImage";
import placeholderImage from "./placeholder.jpg";
import Image from "next/image";

function TestComponent() {
  return <div style={{ backgroundColor: `#ccc` }}>This is a component</div>;
}

function TestCopyComponent() {
  return (
    <>
      <h2>sunt aut facere repellat provident</h2>
      <div>quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto</div>
    </>
  )
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
      <br />
      <SplitLayout contentRight={true}>
        <div>
          <Image src={placeholderImage} alt="placeholder image" width="100%" height="100%" layout="responsive" objectFit="cover" />
        </div>
        <TestCopyComponent />
      </SplitLayout>

      <h2>LargeScreenImage:</h2>
      <p>The image below will only be shown on screens &gt; 767px wide.</p>
      <LargeScreenImage src={placeholderImage} width="400" height="300" />
    </>
  );
}
