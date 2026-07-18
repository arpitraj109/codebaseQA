export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_rgba(15,23,42,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}
