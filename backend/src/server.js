import dotenv from "dotenv";

dotenv.config();

//console.log("DATABASE_URL:", process.env.DATABASE_URL);
//console.log("Type:", typeof process.env.DATABASE_URL);

import app from "./app.js";
import pool from "./config/database.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await pool.query("SELECT NOW()");

        console.log(" Connected to PostgreSQL");

        app.listen(PORT, () => {
             console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {
        console.error(" Database connection failed");
        console.error(err);
        process.exit(1);
    }
}

startServer();
