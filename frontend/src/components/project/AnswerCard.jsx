import EmptyState from "../ui/EmptyState";
import Icon from "../ui/Icon";
import Skeleton from "../ui/Skeleton";
import MarkdownContent from "./MarkdownContent";

export default function AnswerCard({ answer, loading }) {
  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
            <Icon name="bot" className="h-5 w-5" />
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            AI Answer
          </h2>
        </div>
        <div className="mt-6 space-y-3">
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
          <Icon name="bot" className="h-5 w-5" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">
          AI Answer
        </h2>
      </div>

      {answer?.answer ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <MarkdownContent content={answer.answer} />
        </div>
      ) : (
        <EmptyState
          className="mt-5"
          icon="bot"
          title="Ask your first question"
          description="Try: Explain the authentication flow, Where is routing configured, or How are API requests handled?"
        />
      )}
    </div>
  );
}
