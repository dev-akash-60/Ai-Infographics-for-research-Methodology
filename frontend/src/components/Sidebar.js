import React from "react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>📊 AI Studio</h2>
      <ul>
        <li className="active">Dashboard</li>
        <li>Templates</li>
        <li>Export</li>
      </ul>
    </aside>
  );
}

export default Sidebar;