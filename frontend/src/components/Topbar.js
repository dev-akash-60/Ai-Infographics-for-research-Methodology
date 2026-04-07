import React, { useState } from "react";

function Topbar({ generateBlocks, toggleSidebar }) {
  const [topic, setTopic] = useState("");

  return (
    <div className="topbar">
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>

      <input
        placeholder="Enter topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button onClick={() => generateBlocks(topic)}>✨</button>
    </div>
  );
}

export default Topbar;
