import path from "path";

import { indexProject } from "../services/project-index.service.js";
import { downloadGithubRepository } from "../services/github.service.js";
import { getProjectById } from "../services/project.service.js";

export async function getProject(req, res, next) {
  try {
    const project = await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
}

export async function uploadProject(req, res, next) {
    try {
        const projectName = path
            .basename(req.file.originalname, ".zip")
            .replace(/^[^a-zA-Z0-9]+/, "");

        const project = await indexProject({
            name: projectName,
            sourceType: "zip",
            zipPath: req.file.path,
        });

        res.status(201).json({
            success: true,
            project,
        });
    } catch (error) {
        next(error);
    }
}

export async function uploadGithubProject(req, res, next) {
    try {
        const { githubUrl } = req.body;

        if (!githubUrl) {
            return res.status(400).json({
                success: false,
                message: "GitHub URL is required.",
            });
        }

        const repoName = githubUrl
            .split("/")
            .pop()
            .replace(".git", "");

        const zipPath = await downloadGithubRepository(
            githubUrl,
            "storage/uploads"
        );

        const project = await indexProject({
            name: repoName,
            sourceType: "github",
            sourceUrl: githubUrl,
            zipPath,
        });

        res.status(201).json({
            success: true,
            project,
        });
    } catch (error) {
        next(error);
    }
}