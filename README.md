# AI Resume Intelligence Platform

The **AI Resume Intelligence Platform** is a premium, responsive SaaS web application built with a modern Apple-Notion-Stripe aesthetic. It allows job applicants and recruiters to analyze resumes, calculate ATS compliance scores, evaluate strengths/weaknesses, match profiles against specific job descriptions, map actionable development roadmaps, and chat with a conversational AI career assistant.

---

## 🛠 Tech Stack

* **Frontend**: React, Vite, Tailwind CSS, React Router, Framer Motion, React Circular Progressbar, React Dropzone, Lucide Icons.
* **Backend**: FastAPI, Python, Langchain Core, Langchain Google GenAI, PyPDF.
* **AI Engine**: Gemini 2.5 Flash.

---

## 📂 Project Structure

```text
├── backend/
│   ├── main.py            # FastAPI main server & Langchain chain configuration
│   └── requirements.txt   # Python dependency packages
├── src/
│   ├── assets/            # Static assets
│   ├── components/
│   │   └── FloatingAssistant.jsx # Chatbot component
│   ├── context/
│   │   ├── ThemeContext.jsx      # Dark/Light theme toggles
│   │   └── AnalysisContext.jsx   # Global application state management
│   ├── pages/
│   │   ├── LandingPage.jsx       # Hero landing page
│   │   ├── UploadPage.jsx        # Dropzone and scanning simulation UI
│   │   └── Dashboard.jsx         # 8-section ATS report panel
│   ├── App.jsx            # Router and navigation header
│   ├── index.css          # Design system variables & custom styles
│   └── main.jsx           # App entrypoint
├── index.html             # Application HTML root
├── tailwind.config.js     # Tailwind themes definition
└── package.json           # Frontend dependency packages
```

---

## 🚀 How to Run the Project

### 1. Run the Frontend React Web App

1. Ensure you are in the project root directory.
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### 2. Run the Python FastAPI Backend

To utilize live resume parsing via Gemini (instead of the pre-loaded mock analysis engine), run the backend API server:

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # On Windows (PowerShell)
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux
   source venv/bin/activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set your Google Gemini API Key:
   ```bash
   # On Windows (PowerShell)
   $env:GOOGLE_API_KEY="your-actual-api-key"

   # On Windows (CMD)
   set GOOGLE_API_KEY=your-actual-api-key

   # On macOS/Linux
   export GOOGLE_API_KEY="your-actual-api-key"
   ```
5. Run the FastAPI development server:
   ```bash
   python main.py
   ```
   The backend API will start running at `http://localhost:8000`.

*Note: The frontend is configured to automatically detect the backend on port 8000. If the server is offline or fails to connect, the application will fallback to standard mock datasets for seamless demonstration.*
