import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function answerQuestion(projectFiles, question) {
    const codebase = projectFiles
        .map(
            file => `
FILE: ${file.relative_path}
LANGUAGE: ${file.language}

${file.content}
`
        )
        .join("\n\n----------------------\n\n");

    const prompt = `
You are an expert software engineer.

You are given the complete source code of a small project.

Answer the user's question ONLY using the provided code.

If the answer cannot be determined, say so.

Return ONLY valid JSON in this format:

{
  "answer": "string",
  "evidence": [
    {
      "file": "src/components/Login.jsx",
      "startLine": 18,
      "endLine": 42,
      "reason": "Why this file supports the answer"
    }
  ]
}

Rules:
- You have the complete contents of every file.
- Estimate the startLine and endLine of the code that supports your answer.
- Only cite files that were provided.
- Do not invent file names.

Do not include markdown.
Do not wrap the JSON in code fences.

Question:
${question}

Codebase:

${codebase}
`;

    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: prompt,
    });

    const result = JSON.parse(response.output_text);

    return result;
}

export async function generateRefactorSuggestions(projectFiles) {
    const codebase = projectFiles
        .map(
            file => `
FILE: ${file.relative_path}
LANGUAGE: ${file.language}

${file.content}
`
        )
        .join("\n\n----------------------\n\n");

    const prompt = `
You are a senior software architect performing a professional code review.

You are given the complete source code of a project.

Analyze the project and identify the highest-impact refactoring opportunities.

Return ONLY valid JSON.

{
  "summary": "Short overall assessment of the codebase.",
  "suggestions": [
    {
      "title": "Short title",
      "description": "Explain the improvement.",
      "priority": "High",
      "files": [
        "src/api/index.js",
        "src/services/auth.js"
      ]
    }
  ]
}

Rules:
- Return between 5 and 10 suggestions.
- Priorities must be High, Medium, or Low.
- Only mention files that exist.
- Don't invent files.
- Don't suggest meaningless style changes.
- Focus on architecture, maintainability, performance, security, duplication, and code organization.

Codebase:

${codebase}
`;

    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: prompt,
    });

    return JSON.parse(response.output_text);
}