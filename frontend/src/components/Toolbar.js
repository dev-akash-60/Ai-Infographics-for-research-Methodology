import React from "react";

function Toolbar({ selectedBlock, deleteBlock }) {
  if (!selectedBlock) return null;

  return (
    <div className="toolbar">
      <button onClick={deleteBlock}>🗑 Delete</button>
      <button>🎨 Style</button>
      <button>📏 Resize</button>
    </div>
  );
}

export default Toolbar;
