import ThreePartLayout from "../components/ThreePartLayout";

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

      <ThreePartLayout>
        <TestComponent />
        <TestComponent />
        <TestComponent />
      </ThreePartLayout>
    </>
  );
}
