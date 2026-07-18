import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadProject } from "../../api/projects";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

export default function UploadForm() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const data = await uploadProject(formData);

      navigate(`/projects/${data.project.id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ??
        "Failed to upload repository."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
          <Icon name="upload" className="h-4 w-4" />
          Local archive
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
          Upload ZIP Repository
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Upload a ZIP file containing your project.
        </p>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:shadow-sm">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:text-slate-950">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-slate-800">
              {file?.name || "Choose a ZIP file"}
            </span>
            <span className="mt-1 block text-sm text-slate-500">
              {file ? "Ready to upload." : "Only .zip archives are accepted."}
            </span>
          </span>
          <input
            aria-label="Choose ZIP repository file"
            type="file"
            accept=".zip"
            onChange={(e) => setFile(e.target.files[0])}
            className="sr-only"
          />
        </label>
      </div>

      <div className="mt-auto pt-6">
        <Button
          onClick={handleUpload}
          loading={loading}
          disabled={!file}
          className="w-full"
        >
          Upload Repository
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
            ZIP archives only
          </li>

          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span>
            Automatic project indexing
          </li>

          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span>
            AI-powered code analysis
          </li>
        </ul>
      </div>
    </div>
  );
}