# Codebase Q&A with Proof

Analyze software codebases — upload a ZIP archive or import a public GitHub repository — then ask natural language questions and receive AI-generated answers backed by source-level evidence. Also includes AI-generated refactor suggestions with caching.

---

## Features

- **ZIP Upload** — Upload a codebase archive via the browser.
- **GitHub Import** — Clone a public GitHub repository by URL.
- **Repository Indexing** — Extracts supported source files, detects their language, and stores them in PostgreSQL.
- **AI-Powered Q&A** — Ask questions about the codebase. The backend sends the full indexed source code to OpenAI and returns a structured answer.
- **Evidence-Backed Answers** — Every answer includes file paths, line numbers, and source code snippets as supporting evidence.
- **Question History** — The last 10 questions are persisted per project and displayed in the UI.
- **Refactor Suggestions** — AI-generated code review suggestions with priorities (High / Medium / Low), cached in PostgreSQL after first generation.
- **Tab-Based AI Workspace** — Switch between Q&A and Refactor Suggestions in a clean, responsive UI.

---

## Screenshots

> Screenshots to be added. See `/screenshots/` (not included).

---

## Architecture

```
User Upload / GitHub URL
         │
         ▼
   Express Router
         │
         ▼
   Scanner Service  ──►  Extract supported source files
         │
         ▼
   Project Index Service  ──►  Store files in PostgreSQL
         │
         ▼
   AI Service  ──►  OpenAI Responses API  ──►  Structured JSON
         │
         ▼
   Evidence Service  ──►  Enrich evidence with file path,
                           line numbers, source snippets
         │
         ▼
   JSON Response ──►  React Frontend
```

---

## Tech Stack

| Layer      | Technology                       |
|-----------|----------------------------------|
| Backend   | Node.js, Express                 |
| Database  | PostgreSQL                       |
| Migrations| node-pg-migrate (raw SQL files)  |
| AI        | OpenAI Responses API             |
| File Upload | Multer                        |
| ZIP Extraction | unzipper                    |
| Git       | simple-git                       |
| Frontend  | React, Vite, Tailwind CSS        |
| HTTP      | Axios                            |
| Routing   | React Router                     |

---

## Folder Structure

```
codebase-qa/
├── backend/
│   ├── migrations/             # Raw SQL migration files
│   ├── src/
│   │   ├── config/             # DB connection, env config
│   │   ├── controllers/        # Express route handlers
│   │   ├── middlewares/        # Upload, error handler, logging
│   │   ├── routes/             # Express route definitions
│   │   ├── services/           # Business logic layer
│   │   │   ├── ai.service.js
│   │   │   ├── evidence.service.js
│   │   │   ├── github.service.js
│   │   │   ├── project.service.js
│   │   │   ├── project-file.service.js
│   │   │   ├── project-index.service.js
│   │   │   ├── question.service.js
│   │   │   ├── refactor.service.js
│   │   │   ├── repository.service.js
│   │   │   └── scanner.service.js
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/                # Axios client + endpoint functions
│   │   ├── components/         # UI components (Card, Button, Input)
│   │   ├── components/project/ # Project-specific components
│   │   ├── components/home/    # Homepage components
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
└── README.md
```

---

## Backend Setup

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- OpenAI API key

### Installation

```bash
cd backend
npm install
```

### Database

```bash
# Create the database
createdb codebase_qa

# Run migrations
npm run migration:up
```

### Environment Variables

Create `backend/.env`:

```env
PORT=3001
DATABASE_URL=postgres://user:password@localhost:5432/codebase_qa
OPENAI_API_KEY=sk-...
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

---

## Running Locally

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Open `http://localhost:5173` in a browser.

---

## API Overview

| Method | Endpoint                                  | Description                          |
|--------|-------------------------------------------|--------------------------------------|
| POST   | `/api/projects/upload`                    | Upload a ZIP archive                 |
| POST   | `/api/projects/import`                    | Import a public GitHub repository    |
| GET    | `/api/projects`                           | List all projects                    |
| GET    | `/api/projects/:projectId`                | Get a single project                 |
| POST   | `/api/projects/:projectId/questions`      | Ask a question about the codebase    |
| GET    | `/api/projects/:projectId/questions`      | Get recent questions                 |
| GET    | `/api/projects/:projectId/refactor`       | Get refactor suggestions (cached)    |
| GET    | `/api/health`                             | Health check                         |

---

## Deployment Overview

1. Set `NODE_ENV=production` on the backend.
2. Point `DATABASE_URL` to a managed PostgreSQL instance.
3. Build the frontend: `cd frontend && npm run build`.
4. Serve the `frontend/dist` folder via the backend or a static file server (Nginx, Cloudflare Pages, etc.).
5. Set `OPENAI_API_KEY` as a secure environment variable.

See `backend/.env` and `frontend/.env` for the required variables.

---

## Future Improvements

- Embedding-based semantic search for scalable retrieval
- Hybrid retrieval (embeddings + keyword)
- Streaming AI responses
- Incremental repository indexing (re-scan on change)
- Background indexing jobs (queue-based)
- Private GitHub repository support
- Multi-language repository optimization