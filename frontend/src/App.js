import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Workspace from "./components/Workspace";
import "./style.css";

function App() {
  const [blocks, setBlocks] = useState([]);

  // Generate AI content based on user input
  const generateBlocks = async (topic) => {
    // 1. Check if the user actually typed something
    if (!topic) return alert("Please enter a prompt or topic");

    try {
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 2. Pass the 'topic' dynamically into the prompt
        body: JSON.stringify({ prompt: topic }), 
        
        // Note: If you want to force it to always be 6 steps regardless of what they type, 
        // you would do this instead:
        // body: JSON.stringify({ prompt: `Generate 6 steps for a research methodology on: ${topic}` }),
      });

      const data = await res.json();
      console.log("AI Response:", data);

      // Safe extraction
      const content = data.text || "No content generated";

      // Split the response into separate blocks by line breaks
      const steps = content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (steps.length === 0) steps.push(content);

      setBlocks(steps);

    } catch (err) {
      console.error(err);
      alert("Failed to generate AI content. Check backend/API key.");
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        {/* Make sure your Topbar component calls this function with the input text */}
        <Topbar generateBlocks={generateBlocks} />
        <Workspace blocks={blocks} setBlocks={setBlocks} />
      </main>
    </div>
  );
}

export default App;