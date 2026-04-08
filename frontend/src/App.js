import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Workspace from "./components/Workspace";
import "./style.css";

function App() {
  const [blocks, setBlocks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const generateBlocks = async (topic) => {
    const res = await fetch("https://ai-infographics-for-research-methodology.onrender.com/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: topic }),
    });

    const data = await res.json();
    const steps = (data.text || "")
      .split("\n")
      .filter((s) => s.trim() !== "");

    setBlocks(steps);
  };

  return (
    <div className="app">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="main">
        <Topbar generateBlocks={generateBlocks} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Workspace blocks={blocks} setBlocks={setBlocks} />
      </div>
    </div>
  );
}

export default App;
