import fs from "fs";
import path from "path";
import axios from "axios";

export async function downloadGithubRepository(
    repoUrl,
    destinationDir
) {
    const match = repoUrl.match(
        /^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git|\/)?$/
    );

    if (!match) {
        throw new Error("Invalid GitHub repository URL.");
    }

    const [, owner, repo] = match;

    fs.mkdirSync(destinationDir, {
        recursive: true,
    });

    // Get repository details to determine the default branch
    let repoResponse;
    try {
        repoResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}`,
            {
                headers: {
                    Accept: "application/vnd.github+json",
                },
            }
        );
    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error("Repository not found.");
        }

        throw new Error("Unable to access GitHub repository.");
    }

    const defaultBranch = repoResponse.data.default_branch;

    const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${defaultBranch}.zip`;

    const zipPath = path.join(
        destinationDir,
        `${repo}.zip`
    );

    const response = await axios({
        url: zipUrl,
        method: "GET",
        responseType: "stream",
    });

    await new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(zipPath);

        response.data.pipe(stream);

        stream.on("finish", resolve);
        stream.on("error", reject);
    });

    return zipPath;
}