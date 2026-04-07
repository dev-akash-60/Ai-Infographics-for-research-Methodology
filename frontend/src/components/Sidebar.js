import React from "react";

function Sidebar({ open, setOpen }) {
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>🧠 AI Studio</h2>
        <button className="close-btn" onClick={() => setOpen(false)}>✖</button>
      </div>

      <ul>
        <li>📊 Infographics</li>
        <li>📄 Posters</li>
        <li>📑 Slides</li>
      </ul>
    </div>
  );
}

export default Sidebar;
