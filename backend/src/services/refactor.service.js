import {
    getProjectRefactorSuggestions,
    saveProjectRefactorSuggestions,
} from "./project.service.js";

import { getProjectFiles } from "./project-file.service.js";
import { generateRefactorSuggestions } from "./ai.service.js";

export async function getRefactorSuggestions(projectId) {
    // 1. Check cache
    const cached = await getProjectRefactorSuggestions(projectId);

    if (cached?.refactor_suggestions) {
        return cached.refactor_suggestions;
    }

    // 2. Load indexed files
    const projectFiles = await getProjectFiles(projectId);

    // 3. Generate suggestions
    const suggestions = await generateRefactorSuggestions(projectFiles);

    // 4. Cache them
    await saveProjectRefactorSuggestions(
        projectId,
        suggestions
    );

    return suggestions;
}