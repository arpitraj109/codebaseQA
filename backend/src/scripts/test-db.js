import "dotenv/config";
import pool from "../config/database.js";

try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS test_table (
      id SERIAL PRIMARY KEY,
      name TEXT
    );
  `);

  console.log(" SQL executed successfully");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}