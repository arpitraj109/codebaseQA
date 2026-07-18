import fs from "fs/promises";
import path from "path";

import { IGNORED_DIRECTORIES } from "../utils/constants.js";
import { getLanguage } from "../utils/language.js";

export async function scanRepository(rootPath) {
    const files = [];

    await walkDirectory(rootPath, rootPath, files);

    return files;
}

async function walkDirectory(rootPath, currentPath, files) {
    const entries = await fs.readdir(currentPath, {
        withFileTypes: true,
    });

    for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {
            if (IGNORED_DIRECTORIES.includes(entry.name)) {
                continue;
            }

            await walkDirectory(rootPath, fullPath, files);
            continue;
        }

        const stats = await fs.stat(fullPath);

        const extension = path.extname(entry.name);

        const binaryExtensions = [
            ".png",
            ".jpg",
            ".jpeg",
            ".gif",
            ".svg",
            ".ico",
            ".webp",
            ".pdf",
        ];

        let content = null;

        if (!binaryExtensions.includes(extension.toLowerCase())) {
            try {
                content = await fs.readFile(fullPath, "utf8");
            } catch {
                content = null;
            }
        }

        files.push({
            relativePath: path
                .relative(rootPath, fullPath)
                .replaceAll("\\", "/"),
            extension,
            language: getLanguage(extension),
            size: stats.size,
            content,
        });
    }
}