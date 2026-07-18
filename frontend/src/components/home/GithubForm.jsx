import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { importGithubProject } from "../../api/projects";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Input from "../ui/Input";

export default function GithubForm() {
  const navigate = useNavigate();

  const [githubUrl, setGithubUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleImport() {
    if (!githubUrl.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await importGithubProject(githubUrl);

      navigate(`/projects/${data.project.id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ??
        "Failed to import repository."
      );
    } finally {
      setLoading(false);
    }
  }

return (
  <div className="flex h-full flex-col">
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
        <Icon name="github" className="h-4 w-4" />
        Remote repository
      </p>

      <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
        Import from GitHub
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Paste a public GitHub repository URL to automatically download,
        index, and analyze your codebase.
      </p>
    </div>

    <div className="mt-6">
      <Input
        placeholder="https://github.com/owner/repository"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />
    </div>

    <div className="mt-auto pt-6">
      <Button
        onClick={handleImport}
        loading={loading}
        disabled={!githubUrl.trim()}
        className="w-full"
      >
        Import Repository
      </Button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>

    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Supported
      </p>

      <ul className="mt-3 space-y-3 text-sm text-slate-700">
        <li className="flex items-center gap-2">
          <span className="text-emerald-500">✓</span>
          Public GitHub repositories
        </li>

        <li className="flex items-center gap-2">
          <span className="text-emerald-500">✓</span>
          Main & master branches
        </li>

        <li className="flex items-center gap-2">
          <span className="text-emerald-500">✓</span>
          Automatic indexing & AI search
        </li>
      </ul>
    </div>
  </div>
);
}
