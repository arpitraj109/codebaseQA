import Alert from "../ui/Alert";
import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";
import Icon from "../ui/Icon";
import Skeleton from "../ui/Skeleton";

function relativeTime(value) {
  if (!value) return "Just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";

  const diffSeconds = Math.round((Date.now() - date.getTime()) / 1000);
  const absSeconds = Math.abs(diffSeconds);

  if (absSeconds < 60) return "Just now";
  if (absSeconds < 3600) {
    const minutes = Math.round(absSeconds / 60);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }
  if (absSeconds < 86400) {
    const hours = Math.round(absSeconds / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }
  if (absSeconds < 172800) return "Yesterday";
  if (absSeconds < 604800) {
    const days = Math.round(absSeconds / 86400);
    return `${days} days ago`;
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  });
}

export default function QuestionHistory({
  questions,
  loading,
  error,
  selectedQuestionId,
  onSelectQuestion,
}) {
  const hasQuestions = Array.isArray(questions) && questions.length > 0;
  const savedAnswerLabel = `${questions.length} saved ${
    questions.length === 1 ? "answer" : "answers"
  }`;

  return (
    <Card className="p-0 shadow-sm shadow-slate-200/60">
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Icon name="history" className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-950">
                Question History
              </h2>
              <p className="mt-0.5 text-sm font-medium text-slate-500">
                {loading ? "Loading saved answers" : savedAnswerLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 p-5">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : error ? (
        <div className="p-5">
          <Alert>{error}</Alert>
        </div>
      ) : !hasQuestions ? (
        <EmptyState
          className="m-5"
          icon="history"
          title="No questions yet"
          description="Your recent questions will show up here."
        />
      ) : (
        <div className="space-y-2 p-3 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto">
          {questions.map((q) => (
            <button
              type="button"
              key={q.id}
              onClick={() => onSelectQuestion(q)}
              className={`group relative w-full overflow-hidden rounded-xl border p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 ${
                selectedQuestionId === q.id
                  ? "border-slate-400 bg-slate-50 shadow-sm ring-4 ring-slate-100"
                  : "border-slate-200 bg-white"
              }`}
            >
              <span
                className={`absolute inset-y-3 left-0 w-1 rounded-r-full transition ${
                  selectedQuestionId === q.id
                    ? "bg-slate-950"
                    : "bg-transparent group-hover:bg-slate-300"
                }`}
              />
              <div className="flex gap-2">
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition ${
                    selectedQuestionId === q.id
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  <Icon name="history" className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold leading-6 text-slate-800">
                    {q.question}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {relativeTime(q.created_at)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
