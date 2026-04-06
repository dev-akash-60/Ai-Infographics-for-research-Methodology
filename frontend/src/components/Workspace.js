import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function Workspace({ blocks, setBlocks }) {
  const workspaceRef = useRef(null);

  useEffect(() => {
    const workspace = workspaceRef.current;
    const blockElems = workspace.querySelectorAll(".block");

    blockElems.forEach((block) => {
      block.draggable = true;

      block.addEventListener("dragstart", (e) => {
        block.classList.add("dragging");
        block.dataset.offsetX = e.offsetX;
        block.dataset.offsetY = e.offsetY;
      });

      block.addEventListener("dragend", (e) => {
        const offsetX = parseInt(block.dataset.offsetX);
        const offsetY = parseInt(block.dataset.offsetY);

        block.style.position = "absolute";
        block.style.left = e.pageX - workspace.offsetLeft - offsetX + "px";
        block.style.top = e.pageY - workspace.offsetTop - offsetY + "px";
        block.classList.remove("dragging");
      });
    });
  }, [blocks]);

  const handleBlur = (index, e) => {
    const newBlocks = [...blocks];
    newBlocks[index] = e.target.innerText;
    setBlocks(newBlocks);
  };

  const exportAsImage = () => {
    html2canvas(workspaceRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "infographic.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const exportAsPDF = () => {
    html2canvas(workspaceRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("infographic.pdf");
    });
  };

  return (
    <>
      <div className="workspace" ref={workspaceRef}>
        {blocks.map((text, i) => (
          <div
            key={i}
            className="block"
            contentEditable
            suppressContentEditableWarning={true} // 🔹 This removes the warning
            onBlur={(e) => handleBlur(i, e)}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="export-buttons">
        <button onClick={exportAsImage}>📥 Export PNG</button>
        <button onClick={exportAsPDF}>📄 Export PDF</button>
      </div>
    </>
  );
}

export default Workspace;