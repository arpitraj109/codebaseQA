import { randomUUID } from "crypto";
import pool from "../config/database.js";

export async function createProject({
    name,
    sourceType,
    sourceUrl,
    localPath,
}) {
    const id = randomUUID();

    const query = `
        INSERT INTO projects (
            id,
            name,
            source_type,
            source_url,
            local_path,
            status
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *;
    `;

    const values = [
        id,
        name,
        sourceType,
        sourceUrl || null,
        localPath,
        "processing",
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
}

export async function updateProjectStats(projectId, totalFiles) {
    const query = `
        UPDATE projects
        SET
            total_files = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [
        projectId,
        totalFiles,
    ]);

    return rows[0];
}


export async function updateProject(id, data) {
    const query = `
        UPDATE projects
        SET
            local_path = $2,
            status = $3,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *;
    `;

    const values = [
        id,
        data.localPath,
        data.status,
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
}

export async function getProjectById(projectId) {
    const result = await pool.query(
        `
        SELECT
          id,
          name,
          source_type,
          source_url,
          local_path,
          total_files,
          status,
          created_at,
          updated_at
        FROM projects
        WHERE id = $1
        `,
        [projectId]
    );

    return result.rows[0] ?? null;
}

export async function getProjectRefactorSuggestions(projectId) {
    const result = await pool.query(
        `
        SELECT
            refactor_suggestions,
            refactor_generated_at
        FROM projects
        WHERE id = $1
        `,
        [projectId]
    );

    return result.rows[0] ?? null;
}

export async function saveProjectRefactorSuggestions(
    projectId,
    suggestions
) {
    await pool.query(
        `
        UPDATE projects
        SET
            refactor_suggestions = $2,
            refactor_generated_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        `,
        [
            projectId,
            JSON.stringify(suggestions),
        ]
    );
}