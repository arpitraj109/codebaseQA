import { randomUUID } from "crypto";
import pool from "../config/database.js";
import { answerQuestion } from "./ai.service.js";
import { attachEvidenceSnippets } from "./evidence.service.js";

export async function getProjectFiles(projectId) {
    const { rows } = await pool.query(
        `
        SELECT
            relative_path,
            language,
            content
        FROM project_files
        WHERE project_id = $1
          AND content IS NOT NULL
        ORDER BY relative_path
        `,
        [projectId]
    );

    return rows;
}

export async function askProjectQuestion(projectId, question) {
    const projectFiles = await getProjectFiles(projectId);

    if (!projectFiles.length) {
        throw new Error("No indexed files found for this project.");
    }

    const result = await answerQuestion(projectFiles, question);

result.evidence = attachEvidenceSnippets(
    result.evidence,
    projectFiles
);

    await saveProjectQuestion({
        projectId,
        question,
        answer: result.answer,
        evidence: result.evidence,
    });

    return result;
}

export async function saveProjectQuestion({
    projectId,
    question,
    answer,
    evidence,
}) {
    const { rows } = await pool.query(
        `
        INSERT INTO project_questions (
            id,
            project_id,
            question,
            answer,
            evidence
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [
            randomUUID(),
            projectId,
            question,
            answer,
            JSON.stringify(evidence),
        ]
    );

    return rows[0];
}

export async function getRecentProjectQuestions(projectId) {
    const { rows } = await pool.query(
        `
        SELECT
            id,
            question,
            answer,
            evidence,
            created_at
        FROM project_questions
        WHERE project_id = $1
        ORDER BY created_at DESC
        LIMIT 10
        `,
        [projectId]
    );

    return rows;
}
