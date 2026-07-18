export const up = (pgm) => {
    pgm.addColumn("project_files", {
        content: {
            type: "text",
        },
    });
};

export const down = (pgm) => {
    pgm.dropColumn("project_files", "content");
};