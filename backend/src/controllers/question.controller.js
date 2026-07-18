import { askProjectQuestion, getRecentProjectQuestions } from "../services/question.service.js";

export async function askQuestion(req, res, next) {
    try {
        const { id: projectId } = req.params;
        const { question } = req.body;

        if (!question?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Question is required",
            });
        }

        const result = await askProjectQuestion(projectId, question);

        return res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

export async function getRecentQuestions(req, res, next) {
    try {
        const { projectId } = req.params;

        const questions = await getRecentProjectQuestions(projectId);

        res.json({
            success: true,
            data: questions,
        });
    } catch (error) {
        next(error);
    }
}
