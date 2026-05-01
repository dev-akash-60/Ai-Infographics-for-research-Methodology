# 🧠 AI-Generated Infographics for Research Methodology

A full-stack AI-powered web application that transforms research topics into visually structured infographic content. The app generates, edits, and exports infographic-style blocks using modern UI inspired by Canva and Notion.

---

## 🚀 Features

- 🤖 AI-powered content generation (Gemini API)
- 🧩 Editable infographic blocks (contentEditable)
- 🎯 Drag-and-drop interface (Canva-like)
- 📱 Responsive and mobile-friendly UI
- 📥 Export to PNG (high quality)
- 📄 Export to PDF (multi-page support)
- 🎨 Modern UI with animations and glassmorphism
- ⚡ Fast and interactive user experience

---

## 🛠 Tech Stack

### Frontend
- React.js
- CSS (custom modern UI)
- html2canvas
- jsPDF

### Backend
- Node.js
- Express.js
- Gemini API (Google Generative AI)

---

## 📁 Folder Structure
```
project-root/
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Sidebar.js
│ │ │ ├── Topbar.js
│ │ │ ├── Workspace.js
│ │ │ └── Toolbar.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── style.css
│ └── package.json
│
├── backend/
│ ├── server.js
│ ├── package.json
│ └── .env

```
## 🧠 How It Works
- User enters a research topic
- Frontend sends request to backend
- Backend calls Gemini API
- AI generates structured content
- Content is displayed as editable blocks
- User can modify, arrange, and export

## 🔮 Future Scope
- 🎨 Pre-built templates (poster, slides)
- 🖼 Image and icon support
- 📊 Chart integration
- 🌐 Multi-language support
- ☁️ Cloud storage
