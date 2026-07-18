import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadProject,uploadGithubProject, getProject } from "../controllers/project.controller.js";

const router = Router();

router.get(
    "/:id",
    getProject
);

router.post(
    "/upload",
    upload.single("file"),
    uploadProject
);

router.post(
    "/github",
    uploadGithubProject
);


export default router;
