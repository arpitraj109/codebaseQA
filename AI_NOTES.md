# AI Notes

## Overview

The application uses the **OpenAI Responses API** (model `gpt-4.1-mini`) for two distinct tasks:

1. **Codebase Question Answering** — Answering natural language questions about an indexed repository.
2. **Refactor Suggestion Generation** — Analyzing the codebase and producing structured refactoring recommendations.

Both tasks operate on the **full source code** of the repository, loaded from PostgreSQL and sent as context in a single prompt.

---

## Prompting Strategy

### Full-Context Prompting (No RAG)

The system uses **full-context prompting** instead of retrieval-augmented generation (RAG). For each question, the entire indexed codebase is serialised into the prompt as a single string.

**Format:**

```
FILE: src/components/Login.jsx
LANGUAGE: JavaScript

[file content]

--------------------

FILE: src/services/auth.js
LANGUAGE: JavaScript

[file content]
```

**Why:**

- The project targets small to medium repositories where all source files fit within the model's context window (~200K tokens for `gpt-4.1-mini`).
- Full context provides the model with complete information, eliminating retrieval errors from embedding-based search.
- Simpler architecture — no embedding pipeline, no vector store, no chunking logic.

**Trade-off:** This approach does not scale to large repositories. See [Limitations](#known-limitations).

---

## Responses API Usage

Both prompts use `client.responses.create()` with `model: "gpt-4.1-mini"`.

No system role is used — the instruction preamble is embedded directly in the user-facing prompt string.

**Behaviour for question answering:**

```
Input:
  - Instruction preamble with JSON format specification
  - User's question
  - Entire codebase as concatenated file blocks

Processing:
  - The model reads all files
  - Identifies relevant code regions
  - Returns a JSON object with answer + evidence array

Output:
  - Structured JSON parsed with JSON.parse()
```

**Behaviour for refactor suggestions:**

```
Input:
  - Instruction preamble targeting a senior architect persona
  - Entire codebase

Output:
  - JSON with summary + suggestions array
  - Each suggestion: title, description, priority, affected files
```

---

## JSON Output Schema

### Question Answering

```json
{
  "answer": "string — The direct answer to the question.",
  "evidence": [
    {
      "file": "src/components/Login.jsx",
      "startLine": 18,
      "endLine": 42,
      "reason": "Why this file supports the answer"
    }
  ]
}
```

### Refactor Suggestions

```json
{
  "summary": "string — Overall assessment of the codebase.",
  "suggestions": [
    {
      "title": "string — Short description of the issue.",
      "description": "string — Explanation of the improvement.",
      "priority": "High | Medium | Low",
      "files": ["src/api/index.js", "src/services/auth.js"]
    }
  ]
}
```

The AI is instructed to return **5–10 suggestions** and to only reference files that exist in the provided codebase.

---

## Evidence Generation

After the AI returns the answer JSON, the **evidence service** (`evidence.service.js`) enriches each evidence item with:

- `snippet` — the actual source code lines from the file (with line numbers)
- `language` — the detected language of the file

This enrichment happens server-side by reading the already-loaded `projectFiles` array and slicing the relevant lines using `startLine` and `endLine` provided by the AI.

**Why post-processing?**  
The AI cannot reliably reproduce exact source code snippets verbatim, but it can estimate line ranges. By enriching after the response, we guarantee exact, byte-perfect snippets from the stored files.

---

## Refactor Suggestion Generation

The refactor flow (`refactor.service.js`):

1. Check for cached suggestions in the `projects` table (`refactor_suggestions` column).
2. If cached, return immediately.
3. If not cached, load all indexed files and call `generateRefactorSuggestions()`.
4. Save the result to PostgreSQL.
5. Return the result.

The frontend calls `GET /api/projects/:projectId/refactor` when the Refactor Suggestions tab is opened.

---

## Caching Strategy

| Data             | Storage                                                  | Invalidation                         |
|------------------|----------------------------------------------------------|--------------------------------------|
| Refactor suggestions | JSON column in `projects` table (`refactor_suggestions`) | Re-import repository to regenerate   |
| Question history | Rows in `project_questions` table                        | Auto-purged by LIMIT 10 in query     |

Refactor suggestions are generated **once** per project. There is no TTL-based expiry — the cache persists until the repository is re-imported (which creates a new project record).

---

## Design Decisions

### Raw SQL Instead of ORM

- Full control over queries, especially for JSON column reads/writes.
- No abstraction overhead for migrations (raw SQL files via node-pg-migrate).
- The schema is simple enough that an ORM adds complexity without benefit.

### PostgreSQL Instead of a Vector Database

- The project uses full-context prompting, so vector search is not required.
- PostgreSQL with its JSON column support is sufficient for storing evidence and refactor suggestions.
- Avoids operational overhead of maintaining a separate vector store.

### Full-Context Prompting Instead of Embeddings

- Simpler architecture, no chunking, no embedding pipeline.
- The AI sees every file in its entirety — no information loss from chunking.
- Works well for small to medium repositories.

### Cached Refactor Suggestions

- Avoids repeated API calls for the same project.
- Refactor analysis is a relatively expensive operation; generating it once per import is sensible.
- The cache is simple: a JSON column on the project row.

### Evidence Enrichment After AI Response

- The AI estimates line ranges; the server extracts exact snippets.
- Guarantees snippet accuracy independent of model output variability.
- Keeps the AI prompt focused on reasoning rather than verbatim quoting.

### Modular Service Architecture

- Each service has a single responsibility: `scanner.service.js` scans files, `evidence.service.js` enriches evidence, `ai.service.js` calls OpenAI, etc.
- Controllers are thin — they delegate to services and return responses.
- Routes call controllers — routing logic is separated from business logic.

### Small Repository Assumption

- The entire codebase is loaded into memory and sent to the AI.
- This works for repositories with <500 source files and <200K tokens.
- No pagination, chunking, or streaming is implemented for the AI call.

---

## Known Limitations

| Limitation                                       | Explanation                                                                 |
|--------------------------------------------------|-----------------------------------------------------------------------------|
| Public GitHub repositories only                  | Clone uses simple-git with no authentication.                               |
| Large repositories may exceed context limits     | Full-context prompting is bounded by the model's token window.              |
| Refactor suggestions generated once per import   | No refresh mechanism; requires re-import to regenerate.                     |
| Repository updates require re-importing           | No incremental sync — the project is a snapshot of the codebase at import time. |
| No streaming for AI responses                     | The frontend waits for the full response before displaying results.         |