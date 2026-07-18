import Card from "../ui/Card";

export default function RefactorSummary({ summary }) {
  if (!summary) return null;

  return (
    <Card>
      <h3 className="mb-2 text-base font-semibold text-slate-900">
        Overall Assessment
      </h3>
      <p className="text-sm leading-relaxed text-slate-600">{summary}</p>
    </Card>
  );
}