import Card from "../ui/Card";

const priorityStyles = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

export default function RefactorSuggestionCard({ suggestion }) {
  const { title, priority, description, files } = suggestion;

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-base font-semibold text-slate-900">{title}</h4>
        {priority && (
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              priorityStyles[priority] || "bg-slate-100 text-slate-700"
            }`}
          >
            {priority}
          </span>
        )}
      </div>

      {description && (
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      )}

      {files && files.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Affected Files
          </span>
          <div className="flex flex-wrap gap-1.5">
            {files.map((file) => (
              <span
                key={file}
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {file}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}