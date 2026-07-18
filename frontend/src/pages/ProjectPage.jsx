import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject, askQuestion, getRecentQuestions } from "../api/projects";
import ProjectHeader from "../components/project/ProjectHeader";
import QuestionHistory from "../components/project/QuestionHistory";
import AIWorkspace from "../components/project/AIWorkspace";
import Alert from "../components/ui/Alert";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import Skeleton from "../components/ui/Skeleton";

function normalizeQuestion(record, fallbackQuestion) {
  return {
    id: record?.id ?? `local-${Date.now()}`,
    question: record?.question ?? fallbackQuestion,
    answer: record?.answer ?? "",
    evidence: record?.evidence ?? [],
    created_at: record?.created_at ?? new Date().toISOString(),
  };
}

export default function ProjectPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [questionText, setQuestionText] = useState("");

  const selectedQuestion =
    history.find((item) => item.id === selectedQuestionId) ?? null;

  useEffect(() => {
    async function loadProject() {
      try {
        setError("");
        const projectData = await getProject(projectId);
        setProject(projectData.project);
      } catch (err) {
        console.error(err);
        setError("Failed to load this project.");
      } finally {
        setLoading(false);
      }
    }

    async function loadHistory() {
      try {
        setHistory([]);
        setSelectedQuestionId(null);
        setQuestionText("");
        setHistoryError("");
        setHistoryLoading(true);

        const questionsData = await getRecentQuestions(projectId);
        const normalizedHistory = Array.isArray(questionsData.data)
          ? questionsData.data.map((item) => normalizeQuestion(item))
          : [];

        setHistory(normalizedHistory);
      } catch (err) {
        console.error(err);
        setHistoryError("Failed to load question history.");
      } finally {
        setHistoryLoading(false);
      }
    }

    loadProject();
    loadHistory();
  }, [projectId]);

  if (loading) {
    return (
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <Card>
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="mt-5 h-16 w-full" />
          </Card>
          <Card>
            <Skeleton className="h-48 w-full" />
          </Card>
        </div>
        <Card>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-5 h-28 w-full" />
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        description={error || "The project may have been removed or never existed."}
      />
    );
  }

  async function handleAsk(question) {
    try {
      setAsking(true);
      setError("");

      const response = await askQuestion(projectId, question);
      const answeredQuestion = normalizeQuestion(response.data, question);

      setHistory((prev) => [
        answeredQuestion,
        ...prev.filter((item) => item.id !== answeredQuestion.id),
      ]);
      setSelectedQuestionId(answeredQuestion.id);
      setQuestionText(answeredQuestion.question);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ??
          "Failed to generate an answer. Check that the project has finished indexing."
      );
    } finally {
      setAsking(false);
    }
  }

  function handleSelectHistoryItem(item) {
    setSelectedQuestionId(item.id);
    setQuestionText(item.question);
    setError("");
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-6">
        <ProjectHeader project={project} />

        {error && <Alert>{error}</Alert>}

        <Card>
          <h2 className="text-xl font-semibold text-slate-900">
            AI Workspace
          </h2>

          <div className="mt-5">
            <AIWorkspace
              projectId={projectId}
              questionText={questionText}
              onQuestionChange={setQuestionText}
              onAsk={handleAsk}
              asking={asking}
              selectedQuestion={selectedQuestion}
            />
          </div>
        </Card>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <QuestionHistory
          questions={history}
          loading={historyLoading}
          error={historyError}
          selectedQuestionId={selectedQuestionId}
          onSelectQuestion={handleSelectHistoryItem}
        />
      </aside>
    </div>
  );
}
