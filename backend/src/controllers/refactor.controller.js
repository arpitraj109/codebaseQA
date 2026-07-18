import { getRefactorSuggestions } from "../services/refactor.service.js";

export async function getProjectRefactorSuggestions(req, res, next) {
    try {
        const { projectId } = req.params;

        const suggestions = await getRefactorSuggestions(projectId);

        res.json(suggestions);
    } catch (error) {
        next(error);
    }
}