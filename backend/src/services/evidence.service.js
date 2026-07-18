export function attachEvidenceSnippets(evidence, projectFiles) {
    return evidence.map((item) => {
        const file = projectFiles.find(
            (projectFile) =>
                projectFile.relative_path === item.file
        );

        if (!file) {
            return {
                ...item,
                snippet: null,
                language: null,
            };
        }

        const lines = file.content.split("\n");

        const snippet = lines
    .slice(item.startLine - 1, item.endLine)
    .map((line, index) => {
        const lineNumber = item.startLine + index;
        return `${lineNumber.toString().padStart(4, " ")} ${line}`;
    })
    .join("\n");

        return {
            ...item,
            snippet,
            language: file.language,
        };
    });
}