const LANGUAGE_MAP = {
    ".js": "javascript",
    ".jsx": "javascript",
    ".ts": "typescript",
    ".tsx": "typescript",

    ".py": "python",

    ".java": "java",

    ".go": "go",

    ".php": "php",

    ".cs": "csharp",

    ".cpp": "cpp",

    ".c": "c",

    ".json": "json",

    ".md": "markdown",

    ".html": "html",

    ".css": "css",

    ".scss": "scss",

    ".sql": "sql",

    ".yaml": "yaml",

    ".yml": "yaml",

    ".xml": "xml",

    ".sh": "shell",
};

export function getLanguage(extension) {
    return LANGUAGE_MAP[extension] || "text";
}