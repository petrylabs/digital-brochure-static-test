import React, { useState } from "react";

import Modal from "../components/Modal";
import ThreeItemLayout from "../components/ThreeItemLayout";

function TestComponent() {
  return <div style={{ backgroundColor: `#ccc` }}>This is a component</div>;
}

/**
 * This is a TEST PAGE for UI components.
 * To be deleted before release.
 */
export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h1>UI TEST PAGE</h1>

      <ThreeItemLayout>
        <TestComponent />
        <TestComponent />
        <TestComponent />
        <div>This child will not be displayed!</div>
      </ThreeItemLayout>

      <h2>Modal</h2>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>Modal content!</>
      </Modal>
    </>
  );
}
