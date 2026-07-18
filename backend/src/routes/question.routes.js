import { Router } from "express";
import { askQuestion, getRecentQuestions } from "../controllers/question.controller.js";

const router = Router();

router.post("/:id/questions", askQuestion);
router.get("/:projectId/questions", getRecentQuestions);

export default router;
