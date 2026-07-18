import fs from "fs";
import path from "path";
import unzipper from "unzipper";

export async function extractRepository(zipPath, projectId) {
    const destination = path.join(
        "storage",
        "repositories",
        projectId
    );

    fs.mkdirSync(destination, { recursive: true });

    await fs
        .createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: destination }))
        .promise();

    fs.unlinkSync(zipPath);

    // Detect GitHub ZIP root folder
    const entries = fs.readdirSync(destination, {
        withFileTypes: true,
    });

    if (
        entries.length === 1 &&
        entries[0].isDirectory()
    ) {
        return path.join(destination, entries[0].name);
    }

    return destination;
}