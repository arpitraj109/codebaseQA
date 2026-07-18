import { createProject, updateProject, updateProjectStats } from "./project.service.js";
import { extractRepository } from "./repository.service.js";
import { scanRepository } from "./scanner.service.js";
import { createProjectFiles } from "./project-file.service.js";

export async function indexProject({
    name,
    sourceType,
    sourceUrl,
    zipPath,
}) {
    const project = await createProject({
        name,
        sourceType,
        sourceUrl,
        localPath: zipPath,
    });

    const repositoryPath = await extractRepository(
        zipPath,
        project.id
    );

    const scannedFiles = await scanRepository(repositoryPath);

    await createProjectFiles(project.id, scannedFiles);

    await updateProjectStats(
        project.id,
        scannedFiles.length
    );

    return await updateProject(project.id, {
        localPath: repositoryPath,
        status: "ready",
    });
}