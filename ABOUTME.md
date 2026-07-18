# About Me

**Name:** Arpit Raj

**Role:** Software Developer

I build backend systems with an emphasis on clean architecture, predictable data flow, and pragmatic tool selection. My experience spans Node.js, PostgreSQL, REST API design, and integrating AI into production applications.

### What I focused on in this assignment

- **Separation of concerns** — Each backend service has a single, well-defined responsibility. Controllers delegate to services; routes delegate to controllers. The data flow is linear and traceable.
- **Minimal abstractions** — Raw SQL over ORM, simple config over complex frameworks. Every dependency earns its place in `package.json`.
- **AI integration without over-engineering** — Full-context prompting is the simplest possible AI architecture. It works for the target use case (small repositories), avoids embedding pipelines entirely, and is easy to reason about and debug.
- **Correctness of evidence** — Evidence enrichment happens server-side after the AI response. The AI estimates line ranges; the server extracts exact source snippets. This guarantees that what the user sees matches the actual code, regardless of model output variations.
- **Caching for practical performance** — Refactor suggestions are generated once and cached in PostgreSQL. This avoids redundant API calls and keeps the user experience fast, while keeping the caching layer simple (a JSON column on the project row).

### Development Philosophy

- Prefer boring, well-understood technology over novelty.
- Write code that is easy to delete and replace.
- Optimise for clarity first, performance second, unless measurements say otherwise.
- A system is only as reliable as its least reliable external dependency — handle failures explicitly.

### Appreciation

Thank you for reviewing this assignment. I've aimed to produce code that is straightforward to read, test, and extend. I look forward to discussing the design decisions, trade-offs, and potential improvements.