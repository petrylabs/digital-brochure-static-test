import ThreeItemLayout from "../components/ThreeItemLayout";
import SplitLayout from "../components/SplitLayout";

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

      <ThreeItemLayout>
        <TestComponent />
        <TestComponent />
        <TestComponent />
        <div>This child will not be displayed!</div>
      </ThreeItemLayout>
      <br />
      <SplitLayout contentRight={true}>
        <img src="https://via.placeholder.com/300" alt="placeholder image" />
        <TestCopyComponent />
      </SplitLayout>
    </>
  );
}
