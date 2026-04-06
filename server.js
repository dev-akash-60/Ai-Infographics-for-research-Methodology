const express = require("express");
const cors = require("cors");
require("dotenv").config();

// For Node <18 compatibility without installing new SDKs
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // Using gemini-1.5-flash for stable API access
    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 2048 // Increased massively to guarantee full responses
      },
      // Added safety settings to prevent false-positive cutoffs
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ]
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // 1. Check if Gemini returned an HTTP error (e.g., 400, 401, 429)
    if (!response.ok) {
      console.error("Gemini API Error:", JSON.stringify(data, null, 2));
      return res.status(response.status).json({
        error: data.error?.message || "Error from Gemini API"
      });
    }

    // 2. Safely extract the text and the reason it finished
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text || "No response from AI";
    const finishReason = candidate?.finishReason || "UNKNOWN";

    // Log the reason the AI stopped writing to the terminal for debugging
    console.log(`AI finished generating because: ${finishReason}`);

    // Send both the text and the finishReason back to your frontend
    res.json({ text, finishReason });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));