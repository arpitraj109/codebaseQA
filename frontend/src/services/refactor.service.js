import client from "../api/client";

export async function getRefactorSuggestions(projectId) {
  const response = await client.get(`/projects/${projectId}/refactor`);
  return response.data;
}