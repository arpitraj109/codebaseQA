export const up = (pgm) => {
    pgm.addColumn("projects", {
        status: {
            type: "varchar(20)",
            notNull: true,
            default: "processing",
        },
    });
};

export const down = (pgm) => {
    pgm.dropColumn("projects", "status");
};