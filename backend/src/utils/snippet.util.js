export function findRelevantSnippets(content, keywords, contextLines = 3) {
    const lines = content.split("\n");
    const snippets = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].toLowerCase();

        const matched = keywords.some((keyword) =>
            line.includes(keyword)
        );

        if (!matched) {
            continue;
        }

        const start = Math.max(0, i - contextLines);
        const end = Math.min(lines.length - 1, i + contextLines);

        snippets.push({
            startLine: start + 1,
            endLine: end + 1,
            snippet: lines.slice(start, end + 1).join("\n"),
        });
    }

    return snippets;
}