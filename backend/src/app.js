import express from "express";
import cors from "cors";
import projectRoutes from "./routes/project.routes.js";

import healthRoutes from "./routes/health.routes.js";
import questionRoutes from "./routes/question.routes.js";
import { requestLogger } from "./middlewares/index.js";
import refactorRoutes from "./routes/refactor.routes.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

app.use(express.json());

app.use(requestLogger);

app.use("/health", healthRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects", questionRoutes);
app.use("/api/projects", refactorRoutes);

export default app;