import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Textarea from "../ui/Textarea";

export default function QuestionForm({ question, onQuestionChange, onAsk, loading }) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!question.trim()) return;

    onAsk(question);
  }

  function handleKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
            <Icon name="bot" className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            Ask a Question
          </h2>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Press Ctrl+Enter or Cmd+Enter to submit.
        </p>
      </div>

      <Textarea
        autoResize
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something specific, for example: Where are API requests handled?"
        disabled={loading}
        aria-label="Question"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-medium text-slate-400">
          {question.trim().length} characters
        </p>
        <Button
          disabled={loading || !question.trim()}
          loading={loading}
          type="submit"
        >
          <Icon name="bot" className="h-4 w-4" />
          {loading ? "Generating answer" : "Ask AI"}
        </Button>
      </div>
    </form>
  );
}
