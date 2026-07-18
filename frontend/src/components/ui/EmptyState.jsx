import Icon from "./Icon";

export default function EmptyState({ title, description, icon, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-center ${className}`}
    >
      {icon && (
        <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
          <Icon name={icon} className="h-5 w-5" />
        </span>
      )}
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      {description && (
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      )}
    </div>
  );
}
