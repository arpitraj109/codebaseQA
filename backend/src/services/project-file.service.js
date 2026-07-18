import { randomUUID } from "crypto";
import pool from "../config/database.js";

export async function createProjectFiles(projectId, files) {
    if (!files.length) return;

    const values = [];
    const placeholders = [];

    files.forEach((file, index) => {
        const offset = index * 7;

        placeholders.push(
            `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7})`
        );

        values.push(
            randomUUID(),
            projectId,
            file.relativePath,
            file.extension,
            file.language,
            file.size,
            file.content || null
        );
    });

    const query = `
        INSERT INTO project_files (
            id,
            project_id,
            relative_path,
            extension,
            language,
            size,
            content
        )
        VALUES
        ${placeholders.join(",")}
    `;

    await pool.query(query, values);
}

export async function getProjectFiles(projectId) {
    const query = `
        SELECT
            relative_path,
            language,
            content
        FROM project_files
        WHERE project_id = $1
        ORDER BY relative_path;
    `;

    const { rows } = await pool.query(query, [projectId]);

    return rows;
}