import { useState, useEffect } from "react";
import { getRefactorSuggestions } from "../../services/refactor.service";
import Card from "../ui/Card";
import Button from "../ui/Button";
import RefactorSummary from "./RefactorSummary";
import RefactorSuggestionCard from "./RefactorSuggestionCard";

const states = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export default function RefactorWorkspace({ projectId }) {
  const [state, setState] = useState(states.IDLE);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state !== states.IDLE) return;
    fetchSuggestions();
  }, [projectId]);

  async function fetchSuggestions() {
    try {
      setState(states.LOADING);
      setError("");
      const result = await getRefactorSuggestions(projectId);
      setData(result);
      setState(states.SUCCESS);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Unable to load refactor suggestions."
      );
      setState(states.ERROR);
    }
  }

  if (state === states.SUCCESS && data) {
    return (
      <div className="space-y-6">
        <RefactorSummary summary={data.summary} />

        {Array.isArray(data.suggestions) && data.suggestions.length > 0 ? (
          <div className="space-y-4">
            {data.suggestions.map((suggestion, index) => (
              <RefactorSuggestionCard key={index} suggestion={suggestion} />
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-slate-500">
              No refactor suggestions were returned for this project.
            </p>
          </Card>
        )}
      </div>
    );
  }

  if (state === states.LOADING) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-r-slate-700" />
        <p className="mt-4 text-sm font-medium text-slate-600">
          Analyzing repository...
        </p>
        <p className="mt-1 text-xs text-slate-400">
          This may take a few seconds.
        </p>
      </div>
    );
  }

  if (state === states.ERROR) {
    return (
      <Card>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
          <Button onClick={fetchSuggestions} variant="secondary" size="sm">
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return null;
}