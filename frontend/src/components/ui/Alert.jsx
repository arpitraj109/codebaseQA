export default function Alert({ children, tone = "red", className = "" }) {
  const toneClass =
    tone === "red"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-amber-200 bg-amber-50 text-amber-700";

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${toneClass} ${className}`}>
      {children}
    </div>
  );
}
