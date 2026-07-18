import client from "./client";

export const uploadProject = async (formData) => {
  const response = await client.post("/projects/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const importGithubProject = async (githubUrl) => {
  const response = await client.post("/projects/github", {
    githubUrl,
  });

  return response.data;
};

export const getProject = async (projectId) => {
  const response = await client.get(`/projects/${projectId}`);
  return response.data;
};

export const askQuestion = async (projectId, question) => {
  const response = await client.post(
    `/projects/${projectId}/questions`,
    {
      question,
    }
  );

  return response.data;
};

export const getRecentQuestions = async (projectId) => {
  const response = await client.get(
    `/projects/${projectId}/questions`
  );

  return response.data;
};
