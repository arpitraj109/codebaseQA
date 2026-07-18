import { Router } from "express";
import { getProjectRefactorSuggestions } from "../controllers/refactor.controller.js";

const router = Router();

router.get(
    "/:projectId/refactor",
    getProjectRefactorSuggestions
);

export default router;