import express from "express";
import cors from "cors";
import projectRoutes from "./routes/project.routes.js";

import healthRoutes from "./routes/health.routes.js";
import questionRoutes from "./routes/question.routes.js";
import { requestLogger, errorHandler, notFound } from "./middlewares/index.js";
import refactorRoutes from "./routes/refactor.routes.js";

const app = express();


const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
}));


app.use(express.json());

app.use(requestLogger);

app.use("/health", healthRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects", questionRoutes);
app.use("/api/projects", refactorRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
