export const shorthands = undefined;

export async function up(pgm) {
    // Projects
    pgm.createTable("projects", {
        id: {
            type: "uuid",
            primaryKey: true,
        },
        name: {
            type: "text",
            notNull: true,
        },
        source_type: {
            type: "varchar(20)",
            notNull: true,
        },
        source_url: {
            type: "text",
        },
        local_path: {
            type: "text",
            notNull: true,
        },
        total_files: {
            type: "integer",
            default: 0,
            notNull: true,
        },
        created_at: {
            type: "timestamptz",
            default: pgm.func("CURRENT_TIMESTAMP"),
            notNull: true,
        },
        updated_at: {
            type: "timestamptz",
            default: pgm.func("CURRENT_TIMESTAMP"),
            notNull: true,
        },
    });

    // Files inside a project
    pgm.createTable("project_files", {
        id: {
            type: "uuid",
            primaryKey: true,
        },
        project_id: {
            type: "uuid",
            notNull: true,
            references: "projects(id)",
            onDelete: "CASCADE",
        },
        relative_path: {
            type: "text",
            notNull: true,
        },
        extension: {
            type: "varchar(20)",
        },
        language: {
            type: "varchar(50)",
        },
        size: {
            type: "integer",
        },
        created_at: {
            type: "timestamptz",
            default: pgm.func("CURRENT_TIMESTAMP"),
            notNull: true,
        },
    });

    // Questions asked against a project
    pgm.createTable("project_questions", {
        id: {
            type: "uuid",
            primaryKey: true,
        },
        project_id: {
            type: "uuid",
            notNull: true,
            references: "projects(id)",
            onDelete: "CASCADE",
        },
        question: {
            type: "text",
            notNull: true,
        },
        answer: {
            type: "text",
            notNull: true,
        },
        created_at: {
            type: "timestamptz",
            default: pgm.func("CURRENT_TIMESTAMP"),
            notNull: true,
        },
    });

    // Helpful indexes
    pgm.createIndex("project_files", "project_id");
    pgm.createIndex("project_files", "language");
    pgm.createIndex("project_questions", "project_id");
}

export async function down(pgm) {
    pgm.dropTable("project_questions");
    pgm.dropTable("project_files");
    pgm.dropTable("projects");
}