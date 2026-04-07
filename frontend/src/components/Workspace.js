import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Toolbar from "./Toolbar";

function Workspace({ blocks, setBlocks }) {
  const workspaceRef = useRef(null);
  const [selected, setSelected] = useState(null);

  // 🧩 Select block
  const handleSelect = (index) => {
    setSelected(index);
  };

  // ❌ Delete block
  const deleteBlock = () => {
    if (selected === null) return;
    const updated = blocks.filter((_, i) => i !== selected);
    setBlocks(updated);
    setSelected(null);
  };

  // ✏️ Edit text
  const handleBlur = (index, e) => {
    const updated = [...blocks];
    updated[index] = e.target.innerText;
    setBlocks(updated);
  };

  // 📥 Export (clean)
  const exportImage = async () => {
    const el = workspaceRef.current;

    el.style.background = "#fff";

    const canvas = await html2canvas(el, { scale: 2 });
    const link = document.createElement("a");
    link.download = "infographic.png";
    link.href = canvas.toDataURL();
    link.click();

    el.style.background = "";
  };

  const exportPDF = async () => {
    const el = workspaceRef.current;

    el.style.background = "#fff";

    const canvas = await html2canvas(el, { scale: 2 });
    const img = canvas.toDataURL();

    const pdf = new jsPDF();
    pdf.addImage(img, "PNG", 10, 10, 190, 0);
    pdf.save("infographic.pdf");

    el.style.background = "";
  };

  return (
    <>
      <Toolbar selectedBlock={selected} deleteBlock={deleteBlock} />

      <div className="workspace" ref={workspaceRef}>
        {blocks.length === 0 && (
          <div className="empty">
            <h2>✨ Start Creating</h2>
            <p>Enter a topic and generate AI blocks</p>
          </div>
        )}

        {blocks.map((text, i) => (
          <div
            key={i}
            className={`block ${selected === i ? "selected" : ""}`}
            contentEditable
            suppressContentEditableWarning
            onClick={() => handleSelect(i)}
            onBlur={(e) => handleBlur(i, e)}
          >
            {text}
          </div>
        ))}
      </div>

      <div className="export-buttons">
        <button onClick={exportImage}>📥 PNG</button>
        <button onClick={exportPDF}>📄 PDF</button>
      </div>
    </>
  );
}

export default Workspace;
