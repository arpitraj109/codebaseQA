export const up = (pgm) => {
  pgm.addColumns("projects", {
    refactor_suggestions: {
      type: "jsonb",
      notNull: false,
    },
    refactor_generated_at: {
      type: "timestamptz",
      notNull: false,
    },
  });
};

export const down = (pgm) => {
  pgm.dropColumns("projects", [
    "refactor_suggestions",
    "refactor_generated_at",
  ]);
};