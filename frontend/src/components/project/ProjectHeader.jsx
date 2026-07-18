import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Icon from "../ui/Icon";

function statusTone(status) {
  if (status === "ready") return "green";
  if (status === "failed") return "red";
  return "yellow";
}

export default function ProjectHeader({ project }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Icon name="code" className="h-4 w-4" />
            Project
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            {project.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="blue">{project.source_type?.toUpperCase()} Repository</Badge>
            <Badge tone={statusTone(project.status)}>{project.status}</Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:text-right">
          <p className="text-2xl font-bold text-slate-950">
            {project.total_files ?? 0}
          </p>
          <p className="text-sm font-medium text-slate-500">
            indexed files
          </p>
        </div>
      </div>
    </Card>
  );
}
