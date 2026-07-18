const stopWords = new Set([
    "how",
    "what",
    "when",
    "where",
    "why",
    "which",
    "who",
    "does",
    "do",
    "did",
    "is",
    "are",
    "was",
    "were",
    "the",
    "a",
    "an",
    "in",
    "on",
    "of",
    "to",
    "for",
    "and",
    "or",
    "with",
    "by",
    "from",
]);

export function extractKeywords(question) {
    return question
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter(
            word =>
                word.length > 2 &&
                !stopWords.has(word)
        );
}