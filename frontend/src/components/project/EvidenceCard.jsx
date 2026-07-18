import Badge from "../ui/Badge";
import Icon from "../ui/Icon";

export default function EvidenceCard({ item, active, onClick }) {
  const lineRange =
    item.startLine && item.endLine
      ? `Lines ${item.startLine} - ${item.endLine}`
      : "Line range unavailable";
  const reason = item.reason || item.explanation || "No explanation provided.";
  const snippet = item.snippet || "";
  const language = item.language || "text";

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-pressed={active}
      className={`w-full overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 ${
        active ? "border-slate-400 ring-4 ring-slate-100" : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <Icon name="file" className="h-4 w-4 shrink-0 text-slate-500" />
          <p className="break-all text-sm font-bold text-slate-950 sm:truncate">
            {item.file}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Badge>{lineRange}</Badge>
          <Badge tone="blue">{language}</Badge>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            <Icon name="code" className="h-3.5 w-3.5" />
            Reason
          </p>
          <p className="text-sm leading-6 text-slate-600">
            {reason}
          </p>
        </div>

        {snippet ? (
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Icon name="file" className="h-3.5 w-3.5" />
                Code evidence
              </span>
              <span className="text-xs font-medium text-slate-500">
                {lineRange}
              </span>
            </div>
            <pre className="max-w-full overflow-x-auto p-4 text-sm leading-6 text-slate-100">
              <code className={`language-${language} whitespace-pre font-mono`}>
                {snippet}
              </code>
            </pre>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            No code snippet was returned for this evidence item.
          </div>
        )}
      </div>
    </article>
  );
}
