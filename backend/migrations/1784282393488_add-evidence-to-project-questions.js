export const up = (pgm) => {
    pgm.addColumn("project_questions", {
        evidence: {
            type: "jsonb",
            notNull: true,
            default: "[]",
        },
    });
};

export const down = (pgm) => {
    pgm.dropColumn("project_questions", "evidence");
};