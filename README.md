# 🧠 GenAI Mind Map Flow Builder

**GenAI Mind Map Flow Builder** is a Generative AI-powered application that creates intelligent and dynamic mind maps from various data sources. It helps visualize the core ideas and relationships from documents, databases, media, and websites using modern LLMs.

---

## 🚀 Features

- 🔗 Connect and process data from:
  - PDF, DOCX, TXT, CSV, PPTX, MD files
  - SQL databases
  - Images, videos, audios
  - Web URLs
- 🧠 Generate structured mind maps using:
  - **OpenAI**
  - **Google Gemini**
- ⚡ Built with:
  - **FastAPI** for the backend
  - **ReactJS** for the frontend

---

## 📁 Supported Data Sources

| Type         | Formats                                |
|--------------|-----------------------------------------|
| Documents    | `.pdf`, `.docx`, `.txt`, `.md`          |
| Spreadsheets | `.csv`                                  |
| Presentations| `.pptx`                                 |
| Media        | `.mp4`, `.mp3`, `.jpg`, `.png`, etc.    |
| Web          | URLs / web pages                        |
| Databases    | SQL-based (e.g., SQLite, MySQL, etc.)   |

---

## 🛠️ Tech Stack

- **Frontend**: ReactJS, Tailwind CSS *(optional)*
- **Backend**: FastAPI
- **AI Models**: OpenAI, Google Gemini
- **Vector DB**: ChromaDB *(or other configurable vector store)*
- **Storage**: Local or Cloud (based on setup)

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/NextGenAILabs/GenAIMindMapFlowBuilder.git
cd GenAIMindMapFlowBuilder
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
# or
source venv/bin/activate  # On macOS/Linux

pip install -r requirements.txt
uvicorn app:app
```

### 3. Frontend Setup (ReactJS)

```bash
cd frontend
npm install
npm start
```

---

## 🧪 Example Use Case

1. Upload a PDF or connect a database  
2. The system extracts and analyzes content  
3. A mind map is generated showing key concepts and how they're related  

---

## 🤖 AI Integration

- **OpenAI API**: For language understanding, summarization, and structuring  
- **Google Gemini**: For advanced reasoning and multimodal inputs  

> ⚠️ API keys are required and should be added to your `.env` file.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following keys:

```env
# .env

mongo_db_url=
openai_api_key=
gemini_api_key=
gcp_project_id=
aws_access_key_id=
aws_secret_access_key=
bucket_name=
```

> **Note**: Replace the placeholder values with your actual API keys and credentials.

---


## 🙌 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/)
- [ReactJS](https://reactjs.org/)
- [OpenAI](https://openai.com/)
- [Google Gemini](https://deepmind.google/technologies/gemini)

---

## ✨ Contributions Welcome!

Feel free to fork the repo, open issues, or create PRs.  
Let’s build the future of intelligent knowledge visualization together!
