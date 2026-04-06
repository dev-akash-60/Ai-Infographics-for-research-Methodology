import React, { useState } from "react";

function Topbar({ generateBlocks }) {
  const [topic, setTopic] = useState("");

  return (
    <div className="topbar">
      <input
        placeholder="Enter research topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={() => generateBlocks(topic)}>🧠 Generate AI</button>
    </div>
  );
}

export default Topbar;